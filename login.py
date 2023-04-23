import pyrebase
from flask import Flask, request, redirect, render_template

# Initialize the Firebase app with the configuration
config = {
    "apiKey": "AIzaSyBsS-I3SDok19oYEPv4wYsixYdrwyH-lrI",
    "authDomain": "mywebsite-5bd3e.firebaseapp.com",
    "databaseURL": "https://mywebsite-5bd3e-default-rtdb.firebaseio.com",
    "projectId": "mywebsite-5bd3e",
    "storageBucket": "mywebsite-5bd3e.appspot.com",
    "messagingSenderId": "1003118523115",
    "appId": "1:1003118523115:web:858da7a075e54ba62f44ae",
    "measurementId": "G-9L374M2C46"
}

firebase = pyrebase.initialize_app(config)

# Get a reference to the Firebase Realtime Database service
db = firebase.database()

app = Flask(__name__)

@app.route('/')
def home():
    return redirect('/login.html')

@app.route('/login.html')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST','GET'])
def do_login():
    # Get the user's email and password from the login form
    email = request.form['email']
    password = request.form['password']

    try:
        # Try to authenticate the user with Firebase Authentication
        user = firebase.auth().sign_in_with_email_and_password(email, password)
        
        # If authentication is successful, check if the user exists in the database
        user_data = db.child("users").child(user['localId']).get().val()
        if user_data:
            # If the user exists, redirect to the home page
            return redirect('/home.html')
        else:
            # If the user does not exist, show an error message
            message = "User not found"
            return render_template('login.html', message=message)
    except Exception as e:
        # If authentication fails, show an error message
        message = str(e)
        return render_template('login.html', message=message)

@app.route('/home.html')
def home_page():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)
