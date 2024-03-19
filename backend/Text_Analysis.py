import pickle
import re
from flask import request
import nltk
from nltk.tokenize import sent_tokenize,word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import numpy as np
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')



stopwords_set = set(stopwords.words('english'))
emoji_pattern = re.compile('(?::|;|=)(?:-)?(?:\)|\(|D|P)')

# Load the sentiment analysis model and TF-IDF vectorizer
with open('clf.pkl', 'rb') as f:
    clf = pickle.load(f)
with open('tfidf.pkl', 'rb') as f:
    tfidf = pickle.load(f)

#function to get part of speech tag
def getPOS(pos):
  wordnet_pos='v'
    
  if pos.startswith('J'):
        wordnet_pos = 'a'  # Adjective
  elif pos.startswith('V'):
        wordnet_pos = 'v'  # Verb
  elif pos.startswith('N'):
        wordnet_pos = 'n'  # Noun
  elif pos.startswith('R'):
        wordnet_pos = 'r'  # Adverb
  else:
        wordnet_pos = 'n'  # Default to noun
    
  return wordnet_pos



def preprocessing(text):
    

    # Remove HTML tags
    text = re.sub('<[^>]*>', '', text)
    
    # Remove URLs
    text = re.sub(r'http\S+', '', text)
    
    # Extract emojis
    emojis = emoji_pattern.findall(text)
    
    # Remove non-alphanumeric characters, convert to lowercase, and join emojis
    text = re.sub('[\W+]', ' ', text.lower()) + ' '.join(emojis).replace('-', '')
    
    # Tokenization, remove stopwords and lemmatization
    processed_text=[]
    lemmatizer=WordNetLemmatizer()
    sentences=nltk.sent_tokenize(text)
    for sentence in sentences:
       words = word_tokenize(sentence)
       # Obtain POS tags for each word
       pos_tags = nltk.pos_tag(words)
       lemmatized_words = [lemmatizer.lemmatize(word, pos=getPOS(pos)) for word, pos in pos_tags if word.lower() not in set(stopwords.words('english'))]
       processed_text.append(" ".join(lemmatized_words))

    return processed_text


def analyze_sentiment(comment):
   
                    
        print("Comment:", comment)
        sentiment = "unknown"
        preprocessed_comment = preprocessing(comment)
        print("Preprocessed Comment:", preprocessed_comment)
        # comment_list = [preprocessed_comment]
        comment_vector = tfidf.transform(preprocessed_comment)
                
        decision_scores = clf.decision_function(comment_vector)
        print("Raw Decision Scores: [ Negative Postive ,Neutral]", decision_scores)
        predicted_class = np.argmax(decision_scores)
                    
        if predicted_class == 1:
            sentiment="Positive"
        elif predicted_class == 0:
            sentiment="Negative"
        else:
            sentiment="Neutral"

                    
        return sentiment
                