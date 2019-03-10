import pandas as pd
import sqlite3

# open sql connection
with sqlite3.connect('../database/chat.db') as conn:

	# don't load the whole thing at once, just a chunk at a time
	for chunk in pd.read_sql('select * from chats;', conn, chunksize=1000):
		print(chunk.head())
		
		break