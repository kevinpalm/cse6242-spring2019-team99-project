import pandas as pd
import sqlite3
from gensim.models.ldamodel import LdaModel
from gensim.utils import SaveLoad

def load_or_build_lda_model(conn):

	try:

		# load vocab dictionary
		vocab = SaveLoad.load('../model_development/saved_models/model_user_day_room_10.id2word')

		# load model
		ldamodel = LdaModel.load('../model_development/saved_models/model_user_day_room_10')

		print('Pretrained lda model loaded!')

	except:

		# query for aggregating texts per user per room per day
		sql = """
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

		# get vocabulary
		MIN_OCCURANCE = 100
		vocab = Dictionary([pd.read_sql('select word from words where freq >= {}'.format(MIN_OCCURANCE), conn)['word'].tolist()])

		# models for different number of topics
		N_EPOCHS = 10
		n_topics = 10
		style = 'user_day_room'

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

	return vocab, ldamodel


def load_topics(conn):

	# load the vocab and model if we can
	vocab, ldamodel = load_or_build_lda_model(conn)

	# store the topic keywords
	topics = {'topic_id': [], 'word': [], 'prob': []}
	for topic in ldamodel.show_topics(formatted=False):
		for word, prob in topic[1]:
			topics['topic_id'].append(topic[0])
			topics['word'].append(word)
			topics['prob'].append(prob)
	pd.DataFrame(topics).set_index('topic_id')[['word', 'prob']].to_sql('topic_keywords', conn, if_exists='replace')

	# make sure the topic table is clear
	conn.execute('drop table if exists topic_labels;')
	conn.commit()

	# fill in topic labels
	total_len = pd.read_sql('select count(*) from lemmas', conn).iloc[0, 0]
	progress = 0
	print('Filling topic labels...')
	for chunk in pd.read_sql('select chat_id, lemma from lemmas', conn, chunksize=10000):
		chunk = chunk.set_index('chat_id')
		model_inputs = [vocab.doc2bow(text) for text in chunk['lemma'].str.split(' ')]
		topic_labels = {'index': [], 'topic_id': [], 'prob': []}
		for i, p in enumerate(ldamodel[model_inputs]):
			for topic_id, prob in p[0]:
				topic_labels['index'].append(i)
				topic_labels['topic_id'].append(topic_id)
				topic_labels['prob'].append(prob)
		labels = pd.DataFrame(topic_labels).sort_values('prob', ascending=False).drop_duplicates(subset='index').sort_values('index')
		labels.index = chunk.index
		labels[['topic_id', 'prob']].to_sql('topic_labels', conn, if_exists='append')
		progress += len(chunk.index)
		print('\t{}...%'.format(round(progress/total_len*100, 2)), end='\r')
	print('\t...topic labels done!')


def main():

	with sqlite3.connect('chat.db') as conn:
		load_topics(conn)



if __name__ == '__main__':
	main()