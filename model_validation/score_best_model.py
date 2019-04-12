import pandas as pd
import sqlite3
import warnings
#Suppress UserWarning from gensim on Windows
warnings.filterwarnings(action='ignore',category=UserWarning,module='gensim')
from gensim.models.ldamodel import LdaModel
from gensim.models import CoherenceModel
from gensim.utils import SaveLoad
import gensim.corpora as corpora
from os import listdir
from operator import itemgetter

def main():

	# query for a random sample of 24000 texts
	with sqlite3.connect('../database/chat.db') as conn:
		with open('random_sample_texts.sql', 'r') as q:
			random_sample = pd.read_sql(q.read(), conn)['lemma'].str.split().tolist()
		
	# all the model vocabularies are the same, so we can go ahead and use the first one to sparsify inputs for all models
	savedir = '../model_development/saved_models'
	vocab = SaveLoad.load(savedir + '/model_basic_5.id2word')
	model_inputs = [vocab.doc2bow(text) for text in random_sample]
	
	coherence_score = []
	
	
	#  iterate through each model
	for f in [x for x in listdir(savedir) if '.' not in x]:
		
		# load the model
		ldamodel = LdaModel.load(savedir + '/' + f)

		# print scores
		print(f, 'log perplexity:', ldamodel.log_perplexity(model_inputs))

		# TODO: coherence scores... https://radimrehurek.com/gensim/models/coherencemodel.html
		# Done - IA
		
		coherence_model_lda = CoherenceModel(model=ldamodel, texts=random_sample, dictionary=vocab, coherence='c_v')
		coherence_lda = coherence_model_lda.get_coherence()
		print('\nCoherence Score: ', coherence_lda)
		
		coherence_score.append((f,coherence_lda))
		
	# TODO: report best model
	# Done - IA
	print(coherence_score)
	
	print(max(coherence_score,key=itemgetter(1))[0])
	# TODO: visualization/table for the final paper?



if __name__ == '__main__':
	main()