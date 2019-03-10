import pandas as pd
import sqlite3
from os import listdir
from sys import argv


def main():
	"""
	One time helper script to download the FreeCodeCamp chat data and store it
	into a sqlite database
	"""

	# get the location of the free code camp chat download
	try:
		data_folder = argv[1]
	except:
		raise Exception('Missing downloaded data archive in arguments... try rerunning in the form "python3 load_raw.py /location/of/downloaded/folder"')

	# open sql database connection
	with sqlite3.connect('chat.db') as conn:

		# ensure the destination table is clear
		conn.execute('drop table if exists chats;')
		conn.commit()

		# ensure the destination table dtypes
		conn.execute(
			"""
			create table chats (
				chat_id integer primary key autoincrement,
				room_id varchar,
				room_uri varchar,
				sent_at timestampz,
				from_userid varchar,
				from_username varchar,
				message_id varchar,
				text varchar
				);
			""")
		conn.commit()


		# load each file
		tsv_list = [x for x in listdir(data_folder) if x[-4:]=='.tsv']
		for i, tsv in enumerate(tsv_list):
			print('loading... {}%...'.format(round(i/len(tsv_list)*100)), end='\r')
			df = pd.read_csv(data_folder + '/' + tsv
				, delimiter='\t'
				, names=['room_id', 'room_uri', 'sent_at', 'from_userid', 'from_username', 'message_id', 'text'])
			df.to_sql('chats', conn, if_exists='append', index=False)

		# create an index
		conn.execute('create index chats_index on chats (chat_id);')
		conn.commit()

		print('...database loaded!')

if __name__ == '__main__':
	main()

