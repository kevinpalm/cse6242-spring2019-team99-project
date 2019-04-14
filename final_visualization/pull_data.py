import pandas as pd
import sqlite3
from gensim.utils import SaveLoad

def main():

	# sql for pulling final format dataset
	sql = """
	with keywords as (
		select topic_id
			, group_concat(word, ', ') as Keywords
		from (
			select topic_id
				, word
				, prob
			from topic_keywords
			order by topic_id
				, prob desc
			)
		group by topic_id
		)

	select sent_at
		, from_userid
		, topic_id as Chat_Topic
		, Keywords
		, lemma
	from chats
		join topic_labels using (chat_id)
		join keywords using (topic_id)
		join lemmas using (chat_id)

	"""

	# load up the model vocabulary so we can make sure that at least one word was included
	vocab = SaveLoad.load('../model_development/saved_models/model_user_day_room_10.id2word')

	# store to csv for ease of use in the visualization
	df = pd.DataFrame()
	with sqlite3.connect('../database/chat.db') as conn:
		total_len = pd.read_sql('select count(*) from chats', conn).iloc[0,0]
		progress = 0
		for chunk in pd.read_sql(sql, conn, chunksize=100000):

			# remove chats that were too short to have any words from the model vocabulary
			chunk['vocab_words'] = [len(vocab.doc2bow(text)) for text in chunk['lemma'].str.split(' ').tolist()]
			df = df.append(chunk.loc[chunk['vocab_words']>0, ['sent_at', 'from_userid', 'Chat_Topic', 'Keywords']])
			progress += len(chunk.index)
			print(round(progress/total_len*100, 2), '%...', end='\r')


	df.to_csv('../model_development/final_dominant_topic_text_df_FULL.txt', index=False, sep='\t')
	print(len(df.index), 'out of', total_len, 'chats were saved for final visualization!')


if __name__ == '__main__':
	main()