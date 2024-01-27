import pickle
import re
from flask import request
import nltk
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import numpy as np


stopwords_set = set(stopwords.words('english'))
emoji_pattern = re.compile('(?::|;|=)(?:-)?(?:\)|\(|D|P)')

# Load the sentiment analysis model and TF-IDF vectorizer
with open('clf.pkl', 'rb') as f:
    clf = pickle.load(f)
with open('tfidf.pkl', 'rb') as f:
    tfidf = pickle.load(f)





def preprocessing(text):
    

    # Remove HTML tags
    text = re.sub('<[^>]*>', '', text)
    
    # Remove URLs
    text = re.sub(r'http\S+', '', text)
    
    # Extract emojis
    emojis = emoji_pattern.findall(text)
    
    # Remove non-alphanumeric characters, convert to lowercase, and join emojis
    text = re.sub('[\W+]', ' ', text.lower()) + ' '.join(emojis).replace('-', '')
    
   
    # Apply stemming and remove stopwords
    prter = PorterStemmer()
    text = [prter.stem(word) for word in text.split() if word not in stopwords_set]

    return " ".join(text)


def analyze_sentiment(comment):
   
                    
        print("Comment:", comment)
        sentiment = "unknown"
        preprocessed_comment = preprocessing(comment)
        print("Preprocessed Comment:", preprocessed_comment)
        comment_list = [preprocessed_comment]
        comment_vector = tfidf.transform(comment_list)
                
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
                