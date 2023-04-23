// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
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

// Firebase authentication
const auth = firebase.auth();

// Get references to DOM elements
const loginDiv = document.getElementById("login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");

// Add event listeners
loginBtn.addEventListener("click", login);

// Show the login form
loginDiv.style.display = "block";

// Log in the user
function login() {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser;
      if (user && user.emailVerified) { // if the user is signed in and their email is verified
        window.location.href = "user.html";
      } else if (user) { // if the user is signed in but their email is not verified
        alert("Please verify your email address.");
      } else { // if the user is not signed in
        alert("Invalid email or password.");
      }
    })
    .catch(error => alert(error.message));
}
