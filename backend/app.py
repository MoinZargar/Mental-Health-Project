import bcrypt
from flask import Flask, jsonify, render_template, request, session
from flask_socketio import emit, join_room, leave_room, send, SocketIO
from flask_mysqldb import MySQL
from Text_Analysis import analyze_sentiment
app = Flask(__name__)


app.config['MYSQL_HOST'] ='localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] ='Alchemist@123'
app.config['MYSQL_DB'] = 'MentalHealth'
app.config['SECRET_KEY'] ='5791628hghijdedcr13ce0c676dfde280ba245'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PORT']='3306'

mysql = MySQL(app)
socketio = SocketIO(app,manage_session=False,cors_allowed_origins="http://localhost:5173")



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
        email VARCHAR(120),
        username VARCHAR(80) NOT NULL,
        depression INT(30),
        anxiety INT(30),
        bipolar INT(30),
        schizophrenia INT(30),
        FOREIGN KEY (email) REFERENCES users(email)
    );
''')
   cursor.execute('''CREATE TABLE IF NOT EXISTS chatRooms (
    email VARCHAR(120) PRIMARY KEY,
    username VARCHAR(80) NOT NULL,
    depression BOOLEAN DEFAULT false,
    anxiety BOOLEAN DEFAULT false,
    bipolar BOOLEAN DEFAULT false,
    schizophrenia BOOLEAN DEFAULT false,
    FOREIGN KEY (email) REFERENCES users(email)
   );
''')
   cursor.execute('''
    CREATE TABLE IF NOT EXISTS depression (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(120),
        username VARCHAR(80),
        chats TEXT,
        sentiment VARCHAR(255),
        FOREIGN KEY (email) REFERENCES users(email)
    );
''')
   cursor.execute('''
    CREATE TABLE IF NOT EXISTS anxiety (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(120),
        username VARCHAR(80),
        chats TEXT,
        sentiment VARCHAR(255),
        FOREIGN KEY (email) REFERENCES users(email)
    );
''')
   cursor.execute('''
    CREATE TABLE IF NOT EXISTS bipolar (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(120),
        username VARCHAR(80),
        chats TEXT,
        sentiment VARCHAR(255),
        FOREIGN KEY (email) REFERENCES users(email)
    );
''')
   cursor.execute('''
    CREATE TABLE IF NOT EXISTS schizophrenia (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(120),
        username VARCHAR(80),
        chats TEXT,
        sentiment VARCHAR(255),
        FOREIGN KEY (email) REFERENCES users(email)
    );
''')

   cursor.close()

with app.app_context():
    create_database()


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

    

@app.route('/api/signup', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
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
                insert_query = "INSERT INTO tests (email,username,depression,anxiety,bipolar,schizophrenia) VALUES (%s, %s, 0, 0, 0, 0)"
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

#route for getting test scores of test like depression,anxiety,bipolar,schizophrenia
@app.route('/api/getTestScore', methods=['GET','POST'])
def getTestScore():
    if request.method == 'GET':
        try:
            email = session['email']
            username =session['username']
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM tests WHERE email=%s AND username=%s", (email, username))
            result = cursor.fetchone()
            cursor.close()
            if result is None:
                return jsonify({'message': 'User not found','status':400})
            else:
                return jsonify({'depression': result[2], 'anxiety': result[3], 'bipolar': result[4], 'schizophrenia': result[5],'status':200})
        except Exception as e:
            print(f"Error getting test scores: {e}")
            return jsonify({'message': 'Internal Server Error','status':500})
    return jsonify({'message': 'Method Not Allowed','status':405})

#route for getting chat rooms of user where he/she is present
@app.route('/api/getRooms', methods=['GET','POST'])
def getChatRooms():
    
    if request.method == 'GET':
    
        try:
            email = session['email']
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM chatRooms WHERE email=%s", (email,))
            result = cursor.fetchone()
            cursor.close()
            if result is None:
                return jsonify({'message': 'User not found','status':400})
            else:
                
                return jsonify({'depression': result[2], 'anxiety': result[3], 'bipolar': result[4], 'schizophrenia': result[5],'status':200})
        except Exception as e:
            print(f"Error getting chat rooms: {e}")
            return jsonify({'message': 'Internal Server Error','status':500})
    return jsonify({'message': 'Method Not Allowed','status':405})

# sockets for chat
@socketio.on("connect")
def connect():
    print("connected")

#socket for joining room
    
@socketio.on("join-room")
def on_join(data):
    try:
        room = data['roomName']
        email = session['email']
        username =session['username']
        sid=request.sid
        cursor = mysql.connection.cursor()
        table_name = f"`{room}`"
        
        join_room(room)
        print("joined room:", room)
        # Fix the SQL query formatting
        cursor.execute(f"SELECT * FROM chatRooms WHERE email=%s", (email,))
        result = cursor.fetchone()
        
        if result is None:
            # If the user doesn't exist, create a new entry in the table
            insert_query = f"INSERT INTO chatRooms (email, username) VALUES (%s, %s)"
            cursor.execute(insert_query, (email, username,))
            cursor.execute(f"UPDATE chatRooms SET {table_name}=true WHERE email=%s", (email,))
            mysql.connection.commit()
        else:
            # If the user exists, update the room status
            cursor.execute(f"UPDATE chatRooms SET {table_name}=true WHERE email=%s", (email,))
            mysql.connection.commit()
            cursor.close()
        # Send a join message to all users in the room
        join_message = f"{username} has joined the room."
        emit("user-joined", join_message, room=room)
        
    except Exception as e:
        print("Error:", e)

#socket for fetching previous chats of user in room
@socketio.on("get-all-chats")
def get_all_chats(data):
    try:
        room = data['roomName']
        email = session['email']
        username =session['username']
        sid=request.sid
        print("room:", room)
        cursor = mysql.connection.cursor()
        table_name = f"`{room}`"
        select_query = f"""SELECT email, username, chats,sentiment FROM {table_name}  WHERE id >= (
         SELECT id FROM {table_name} WHERE email=%s ORDER BY id LIMIT 1
         )
         """
        cursor.execute(select_query, (email,))
        chats_data = cursor.fetchall()
        cursor.close()

        if chats_data is not None:
           
        # Create an array to store chats
            all_chats = [{'email':row[0],'username': row[1], 'message': row[2],'sentiment': row[3]} for row in chats_data]
            # Emit the array of all chats a user in the room
            emit("receive-all-chats", all_chats, room=sid)
        

    except Exception as e:
        print("Error:", e)

#socket for recieving message from client side 
@socketio.on("send-message")
def on_send(data):
    try:
        room = data['roomName']
        email = data['email']
        username = data['username']
        chats = data['message']
        # Analyze the sentiment of the message
        sentiment = analyze_sentiment(chats)
        cursor = mysql.connection.cursor()
        if chats == "":
            return
        # Use proper string formatting for table name
        table_name = f"`{room}`"
        insert_query = f"INSERT INTO {table_name} (email, username,chats,sentiment) VALUES (%s, %s,%s,%s)"
        cursor.execute(insert_query, (email, username,chats,sentiment,))
        mysql.connection.commit()
        cursor.close()
        # Emit the message to all users in the room
        emit("receive-message", [{'email': email, 'username': username, 'message': chats,'sentiment':sentiment}], room=room)
        
    except Exception as e:
        print("Error:", e)





if __name__ == '__main__':
    socketio.run(app, debug=True)
