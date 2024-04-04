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





nltk.download('averaged_perceptron_tagger')

# Load the SavedModel
model = load_model("sentiment_model_v2.h5")
# Load the pickled model
# with open('model.pkl', 'rb') as f:
#     model = pickle.load(f)
with open('tfidf_v2.pkl', 'rb') as f:
    tfidf= pickle.load(f)

stopwords_set = set(stopwords.words('english'))
emoji_pattern = re.compile('(?::|;|=)(?:-)?(?:\)|\(|D|P)')




# # function to perform one hot encoding and padding
# def oneHotEncoding(text):
#      # perform one hot encoding
    
#     vocab_size=20266
#     oneHotEncodedText=[one_hot(text,vocab_size)]
#     print("One Hot Encoded Text:",oneHotEncodedText)
# #     # perform padding of encoded text
#     sent_length=130
#     paddedSequence=pad_sequences(oneHotEncodedText,padding='post',maxlen=sent_length)
#     print("Padded encoded text",paddedSequence)
#     return paddedSequence

# #function to get part of speech tag
# def getPOS(pos):
#   wordnet_pos='v'
    
#   if pos.startswith('J'):
#         wordnet_pos = 'a'  # Adjective
#   elif pos.startswith('V'):
#         wordnet_pos = 'v'  # Verb
#   elif pos.startswith('N'):
#         wordnet_pos = 'n'  # Noun
#   elif pos.startswith('R'):
#         wordnet_pos = 'r'  # Adverb
#   else:
#         wordnet_pos = 'n'  # Default to noun
    
#   return wordnet_pos



# def preprocessing(text):
    

#     # Remove HTML tags
#     text = re.sub('<[^>]*>', '', text)
    
#     # Remove URLs
#     text = re.sub(r'http\S+', '', text)
    
#     # Extract emojis
#     emojis = emoji_pattern.findall(text)
    
#     # Remove non-alphanumeric characters, convert to lowercase, and join emojis
#     text = re.sub('[\W+]', ' ', text.lower()) + ' '.join(emojis).replace('-', '')
#     # lower case conversion
#     text=text.lower()
   
#     # Tokenization, remove stopwords and lemmatization
    
   
#     lemmatizer=WordNetLemmatizer()
#     words=word_tokenize(text)
#     pos_tags = nltk.pos_tag(words)
#     lemmatized_words = [lemmatizer.lemmatize(word, pos=getPOS(pos)) for word, pos in pos_tags if word.lower() not in set(stopwords.words('english'))]

#     processed_text=' '.join(lemmatized_words)
#     print("Processed Text:",processed_text) 
#     print("TensorFlow version:", tf.__version__)  
#     oneHotEncodedText=oneHotEncoding(processed_text)
#     return oneHotEncodedText
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

# def analyze_sentiment(comment):
#     preprocessed_comment = preprocessing(comment)
#     print("Preprocessed Comment:", preprocessed_comment)
#     comment_list = [preprocessed_comment]
#     comment_vector = tfidf.transform(comment_list).toarray()
#     # print("TF-IDF Vector:", comment_vector)
    
#     # Reshape TF-IDF vector for LSTM input
#     comment_vector_lstm = np.reshape(comment_vector, (comment_vector.shape[0], 1, comment_vector.shape[1]))
    
#     decision_scores = model.predict(comment_vector_lstm)
#     print("Raw Decision Scores:", decision_scores)
#     predicted_class = np.argmax(decision_scores)
    
#     if predicted_class == 1:
#         sentiment="Positive"
#     elif predicted_class == 0:
#         sentiment="Negative"
#     else:
#         sentiment="Neutral"

#     return sentiment
