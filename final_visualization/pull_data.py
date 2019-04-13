import pandas as pd
import sqlite3

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
	from chats
		join topic_labels using (chat_id)
		join keywords using (topic_id)
	"""

	# store to csv for ease of use in the visualization
	with sqlite3.connect('../database/chat.db') as conn:
		df = pd.read_sql(sql, conn)
		df.to_csv('../model_development/final_dominant_topic_text_df_FULL.txt', index=False, sep='\t')


if __name__ == '__main__':
	main()