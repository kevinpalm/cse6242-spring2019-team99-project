from nltk.corpus import stopwords
from gensim.utils import simple_preprocess
import pandas as pd
import sqlite3
import spacy

"""
Much of our preprocessing pipeline comes from following this excellent
tutorial: https://www.machinelearningplus.com/nlp/topic-modeling-gensim-python/
"""


def lemmatization(tokens, nlp, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV']):
    """https://spacy.io/api/annotation"""

    return [token.lemma_ for token in nlp(" ".join(tokens)) if token.pos_ in allowed_postags]


def clean_sentence(sentence, stopwords, nlp):
	"""
	Remove stopwords and apply lemmatization per each sentence
	"""
	
	# tokenize
	tokens = simple_preprocess(str(sentence), deacc=True)

	# remove stopwords
	tokens = [word for word in tokens if word not in stopwords]

	# lemmatize
	lemmas = lemmatization(tokens, nlp)

	return " ".join([str(x) for x in lemmas])


def preprocess_pipeline(df, stopwords, nlp):
	"""
	Apply data cleaning to a chunk of texts
	"""

	# Remove Emails
	df['text'] = df['text'].str.replace(r'\S*@\S*\s?', '')

	# Remove new line characters
	df['text'] = df['text'].str.replace(r'\s+', ' ')

	# Remove distracting single quotes
	df['text'] = df['text'].str.replace(r"\'", "")

	# clean each sentence
	df['lemma'] = df['text'].apply(lambda x: clean_sentence(x, stopwords, nlp))

	return df['lemma']


def build_lemma_table(conn):
	"""
	iterate through the dataset and build a table of lemmatized texts so we
	don't have to redo this every time we build a new model
	"""

	# define words to ignore
	stop_words = stopwords.words('english')
	stop_words.extend(['from', 'subject', 're', 'edu', 'use','https','http','.png'])

	# Initialize spacy 'en' model, keeping only tagger component (for efficiency)
	nlp = spacy.load('en', disable=['parser', 'ner'])

	# make sure the table is clear
	conn.execute('drop table if exists lemmas;')
	conn.commit()

	# iterate through and build the table
	table_size = pd.read_sql('select count(*) from chats;', conn).iloc[0, 0]
	progress = 0
	print('Preprocessing text...')
	print('0.0%...', end='\r')
	for chunk in pd.read_sql('select chat_id, "text" from chats', conn, chunksize=1000):

		# set index
		chunk = chunk.set_index('chat_id')

		# clean text
		lemmas = preprocess_pipeline(chunk, stop_words, nlp)

		# save to the database
		lemmas.to_sql('lemmas', conn, if_exists='append')

		# report progress
		progress += len(lemmas.index)
		print('{}%...'.format(round(progress/table_size*100, 2)), end='\r')


def main():
	with sqlite3.connect('chat.db') as conn:
		build_lemma_table(conn)

if __name__ == '__main__':
	main()