import pandas as pd
import sqlite3
from collections import defaultdict

def build_vocab(conn):

	# count word occurances
	print('building vocabulary...')
	vocab_sql = "select lemma from lemmas where nullif(lemma, '') is not null"
	vocab = defaultdict(int)
	total_rows = pd.read_sql("select count(*) from lemmas where nullif(lemma, '') is not null", conn).iloc[0, 0]
	finished_rows = 0
	for chunk in pd.read_sql(vocab_sql, conn, chunksize=1000):
		for index, row in chunk.iterrows():
			for word in row['lemma'].split(' '):
				vocab[word] += 1
		finished_rows += len(chunk.index)
		print(round(finished_rows/total_rows*100, 2), '%...', end='\r')

	# organize
	vocab = pd.DataFrame(pd.Series(vocab)).reset_index()
	vocab.index.rename('word_id', inplace=True)
	vocab.columns = ['word', 'freq']

	# make sure the table is clear
	conn.execute('drop table if exists words;')
	conn.commit()

	# save to database
	vocab.to_sql('words', conn)


def main():
	with sqlite3.connect('chat.db') as conn:
		build_vocab(conn)

if __name__ == '__main__':
	main()