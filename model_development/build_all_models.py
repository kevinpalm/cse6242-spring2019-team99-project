import pandas as pd
import sqlite3
from gensim.models.ldamodel import LdaModel
from gensim.corpora.dictionary import Dictionary

def get_model_sql():
	"""
	Testing two type of aggregations to see if they help improve the
	short text dataset models
	"""

	basic_sql = """
	select lemma
	from lemmas
	where nullif(lemma, '') is not null
	order by random();
	"""

	user_sql = """
	select group_concat(lemma, ' ') as lemma
	from lemmas
		join (
			select chat_id
				, from_userid
			from chats
			) using (chat_id)
	where nullif(lemma, '') is not null
	group by from_userid
	order by random();
	"""

	user_day_room_sql = """
	select group_concat(lemma, ' ') as lemma
	from lemmas
		join (
			select chat_id
				, from_userid
				, strftime('%Y-%m-%d', sent_at) as sent_day
				, room_id
			from chats
			) using (chat_id)
	where nullif(lemma, '') is not null
	group by from_userid
		, sent_day
		, room_id
	order by random();
	"""

	return [basic_sql, user_sql, user_day_room_sql]


def build_all():
	"""
	build and save a bunch of models to evaluate
	"""

	with sqlite3.connect('../database/chat.db') as conn:

		# get vocabulary
		MIN_OCCURANCE = 100
		vocab = Dictionary([pd.read_sql('select word from words where freq >= {}'.format(MIN_OCCURANCE), conn)['word'].tolist()])

		# models for different number of topics
		N_EPOCHS = 10
		for n_topics in [i for i in range(5, 26, 5)]:

			# one model per each aggregation style
			for style, sql in zip(['basic', 'user', 'user_day_room'], get_model_sql()):

				# init model
				lda_model = LdaModel(
					id2word=vocab,
					num_topics=n_topics, 
					alpha='auto',
					per_word_topics=True)

				# do training
				print('training model_{0}_{1}'.format(style, n_topics))
				for epoch in range(N_EPOCHS):
					print('\tepoch', epoch, '...', end='\r')
					for chunk in pd.read_sql(sql, conn, chunksize=10000):
						chunk_corpa = [vocab.doc2bow(text) for text in chunk['lemma'].str.split(' ').tolist()]
						lda_model.update(chunk_corpa)
					print('\tepoch', epoch, '... done!')

				# Save model to disk.
				lda_model.save("saved_models/model_{0}_{1}".format(style, n_topics))


def main():
	build_all()


if __name__ == '__main__':
	main()