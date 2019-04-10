import pandas as pd
import sqlite3
from gensim.models.ldamodel import LdaModel
from gensim.utils import SaveLoad
from os import listdir

def main():

	# query for a random sample of 24000 texts
	with sqlite3.connect('../database/chat.db') as conn:
		with open('random_sample_texts.sql', 'r') as q:
			random_sample = pd.read_sql(q.read(), conn)['lemma'].str.split().tolist()

	# all the model vocabularies are the same, so we can go ahead and use the first one to sparsify inputs for all models
	savedir = '../model_development/saved_models'
	vocab = SaveLoad.load(savedir + '/model_basic_5.id2word')
	model_inputs = [vocab.doc2bow(text) for text in random_sample]

	#  iterate through each model
	for f in [x for x in listdir(savedir) if '.' not in x]:
		
		# load the model
		ldamodel = LdaModel.load(savedir + '/' + f)

		# print scores
		print(f, 'log perplexity:', ldamodel.log_perplexity(model_inputs))

		# TODO: coherence scores... https://radimrehurek.com/gensim/models/coherencemodel.html

	# TODO: report best model

	# TODO: visualization/table for the final paper?



if __name__ == '__main__':
	main()