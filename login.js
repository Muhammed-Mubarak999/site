// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsS-I3SDok19oYEPv4wYsixYdrwyH-lrI",
  authDomain: "mywebsite-5bd3e.firebaseapp.com",
  databaseURL: "https://mywebsite-5bd3e-default-rtdb.firebaseio.com",
  projectId: "mywebsite-5bd3e",
  storageBucket: "mywebsite-5bd3e.appspot.com",
  messagingSenderId: "1003118523115",
  appId: "1:1003118523115:web:858da7a075e54ba62f44ae",
  measurementId: "G-9L374M2C46"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

// Add login event
loginBtn.addEventListener('click', e => {
  // Get email and password
  const email = emailInput.value;
  const password = passwordInput.value;

  // Sign in with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Check if user's email is verified
      if (!userCredential.user.emailVerified) {
        // Sign out user
        firebase.auth().signOut();
        // Show error message
        alert('Please verify your email to log in.');
      } else {
        // Redirect to user.html page
        window.location.href = 'user.html';
      }
    })
    .catch(error => {
      // Handle error
      alert('Invalid email or password.');
    });
});
