import pickle
import re
from flask import request
import nltk
from nltk.tokenize import sent_tokenize,word_tokenize
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import numpy as np
import tensorflow as tf
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model
from keras.layers import Embedding




nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')

# Load the SavedModel
model = load_model("sentiment_model_v2.h5")

with open('tfidf_v2.pkl', 'rb') as f:
    tfidf= pickle.load(f)

stopwords_set = set(stopwords.words('english'))
emoji_pattern = re.compile('(?::|;|=)(?:-)?(?:\)|\(|D|P)')


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
    # Tokenization and stemming
    prter = PorterStemmer()
    tokens = nltk.word_tokenize(text)
    text = [prter.stem(word) for word in tokens if word not in stopwords_set]

    return " ".join(text)
    

def analyze_sentiment(comment):
    preprocessed_comment = preprocessing(comment)
    print("Preprocessed Comment:", preprocessed_comment)
    comment_list = [preprocessed_comment]
    comment_vector = tfidf.transform(comment_list).toarray()
    # print("TF-IDF Vector:", comment_vector)

    # Reshape TF-IDF vector for LSTM input
    comment_vector_lstm = np.reshape(comment_vector, (comment_vector.shape[0], 1, comment_vector.shape[1]))

    decision_scores = model.predict(comment_vector_lstm)
    print("Raw Decision Scores:", decision_scores)
    predicted_class = np.argmax(decision_scores)

    emotion_mapping = {0: 'sadness', 1: 'joy', 2: 'love', 3: 'anger', 4: 'fear', 5: 'surprise'}
    predicted_emotion = emotion_mapping[predicted_class]
    print("Predicted Emotion:", predicted_emotion)
    return predicted_emotion

