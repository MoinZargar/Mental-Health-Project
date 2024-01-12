import bcrypt
from flask import Flask, jsonify, render_template, request, session
import pickle
import re
import nltk
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import numpy as np
from flask_mysqldb import MySQL




app = Flask(__name__)

app.config['MYSQL_HOST'] ='localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] ='Alchemist@123'
app.config['MYSQL_DB'] = 'MentalHealth'
app.config['SECRET_KEY'] ='5791628bbdedcr13ce0c676dfde280ba245'
app.config['PORT']='3306'

mysql = MySQL(app)


def create_database():
   cursor = mysql.connection.cursor()
   cursor.execute("CREATE DATABASE IF NOT EXISTS MentalHealth")
   cursor.execute("USE MentalHealth")
   cursor.execute(
   '''CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(120) PRIMARY KEY,
    username VARCHAR(80) NOT NULL,
    password VARCHAR(160) NOT NULL
   
   );'''
   )
   cursor.execute('''
        CREATE TABLE IF NOT EXISTS tests (
            email VARCHAR(120) REFERENCES users(email),
            username VARCHAR(80) NOT NULL,
            `Depression Test` INT(30),
            `Anxiety Test` INT(30),
            `Bipolar Test` INT(30),
            `Schizophrenia Test` INT(30),
            PRIMARY KEY (email, username)
        );
    ''')

   cursor.close()

with app.app_context():
    create_database()

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

#hashing password
def hash_password(password):
    # Generate a salt
    password = password.encode("utf-8")
    hash = bcrypt.hashpw(password, bcrypt.gensalt())
    stored_password = hash.decode("utf-8")
    return stored_password

# Verify a password against the hashed password in the database
def verify_password(password, hashed_password):
    if bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8")):
       return True
    return False

    

@app.route('/api/predict', methods=[ 'POST'])
def analyze_sentiment():
    if request.method == 'POST':
        try:
            comment = request.json['text']
            
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
                sentiment="Positive comment"
            elif predicted_class == 0:
                sentiment="Negative comment"
            else:
                sentiment="Neutral comment"

            
            return jsonify({'sentiment': sentiment})
        except Exception as e:
            # Handle errors
            print(f"Error analyzing sentiment: {e}")
            return jsonify({'sentiment': 'Internal Server Error'}), 500

@app.route('/api/signup', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        print("inside signup")
        try:
            email = request.json['email']
            username = request.json['name']
            password = request.json['password']
            hashed_password = hash_password(password)
            cursor = mysql.connection.cursor()
            
            # Check if the email already exists
            cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
            result = cursor.fetchone()
            
            # If new user, create an entry in the database
            if result is None:
                cursor.execute("INSERT INTO users(email, username, password) VALUES(%s, %s, %s)", (email, username, hashed_password))
                mysql.connection.commit()
                cursor.close()
                session['email'] = email
                session['username']=username
                return jsonify({'email':email, 'username':username,'status':200})
            else:
                cursor.close()
                return jsonify({'message': 'Email already exists','status':400})
        except Exception as e:
            print(f"Error creating user: {e}")
            return jsonify({'message': 'Internal Server Error','status':500})
    return jsonify({'message': 'Method Not Allowed','status':405})
        
@app.route('/api/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        try:
            email = request.json['email']
            password = request.json['password']
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
            result = cursor.fetchone()
            cursor.close()
            if result is None:
                return jsonify({'message': 'Please check email and Password','status':400})
            else:
                if verify_password(password, result[2]):
                    session['email'] = email
                    session['username']=result[1]
                    name=session['username']
                    return jsonify({'email':email, 'username':name,'status':200})
                else:
                    return jsonify({'message': 'Please check email and Password','status':400})
        except Exception as e:
            print(f"Error logging in: {e}")
            return jsonify({'message': 'Internal Server Error','status':500})
    return jsonify({'message': 'Method Not Allowed','status':405})

@app.route('/api/getCurrentUser', methods=['GET','POST'])
def getCurrentUser():
    if request.method == 'GET':
        try:
            if 'email' in session:
                return jsonify({'email': session['email'],'username':session['username'],'status':200})
            else:
                return jsonify({'message': 'User not logged in','status':400})
        except Exception as e:
            print(f"Error getting current user: {e}")
            return jsonify({'message': 'Internal Server Error','status':500})
    return jsonify({'message': 'Method Not Allowed','status':405})

@app.route('/api/logout', methods=['GET','POST'])
def logout():
    if request.method == 'GET':
        try:
            session.pop('email', None)
            session.pop('username',None)
            return jsonify({'message': 'Logout successful','status':200})
        except Exception as e:
            print(f"Error logging out: {e}")
            return jsonify({'message': 'Internal Server Error','status':500})
    return jsonify({'message': 'Method Not Allowed','status':405})

#route for submitting test scores of test like depression,anxiety,bipolar,schizophrenia
@app.route('/api/submitTest', methods=['GET','POST'])
def submitTest():
    if request.method == 'POST':
        try:
            email = session['email']
            username =session['username']
            testType = request.json['TestType']
            score = request.json['TotalScore']
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM tests WHERE email=%s", (email,))
            result = cursor.fetchone()
            # Check if the user exists in the 'tests' table
            cursor.execute("SELECT * FROM tests WHERE email=%s AND username=%s", (email, username))
            result = cursor.fetchone()

            if result:
                # If the user exists, update the score for the specified testType
                update_query = f"UPDATE tests SET `{testType}`=%s WHERE email=%s AND username=%s"
                cursor.execute(update_query, (score, email, username))
            else:
                # If the user doesn't exist, create a new entry in the 'tests' table
                insert_query = "INSERT INTO tests (email, username, `Depression Test`, `Anxiety Test`, `Bipolar Test`, `Schizophrenia Test`) VALUES (%s, %s, 0, 0, 0, 0)"
                cursor.execute(insert_query, (email, username))
                
                # Update the score for the specified testType
                update_query = f"UPDATE tests SET `{testType}`=%s WHERE email=%s AND username=%s"
                cursor.execute(update_query, (score, email, username))

            mysql.connection.commit()
            cursor.close()
            return jsonify({'message': 'Test submitted successfully','status':200})
        except Exception as e:
            print(f"Error submitting test: {e}")
            return jsonify({'message': 'Internal Server Error','status':500})
    return jsonify({'message': 'Method Not Allowed','status':405})


if __name__ == '__main__':
    app.run(debug=True)
