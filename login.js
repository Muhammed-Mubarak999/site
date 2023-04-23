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

// Get elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const registerLink = document.getElementById('register-link');
const forgotPasswordLink = document.getElementById('forgot-password-link');

// Add login event listener
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Check if user's email is verified
      if (!userCredential.user.emailVerified) {
        // If not verified, sign out user and display error message
        firebase.auth().signOut();
        alert('Please verify your email before logging in.');
      } else {
        // If verified, log in user
        alert('Logged in successfully!');
        window.location.href = 'dashboard.html'; // Redirect to dashboard page
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Add register link event listener
registerLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'register.html'; // Redirect to register page
});

// Add forgot password link event listener
forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  const email = emailInput.value;
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('Password reset email sent!');
    })
    .catch((error) => {
      alert(error.message);
    });
});
