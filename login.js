// Initialize Firebase SDK
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

// Get a reference to the Firebase Authentication service
var auth = firebase.auth();

// Get a reference to the Firebase Realtime Database service
var database = firebase.database();

// Get references to the DOM elements
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var loginBtn = document.getElementById("loginBtn");

// Add event listeners
loginBtn.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default form submission

  var email = emailInput.value;
  var password = passwordInput.value;

  // Sign in the user with email and password
  auth.signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Check if the user's email is verified
      if (userCredential.user.emailVerified) {
        // Redirect to the user dashboard
        window.location.href = "user.html";
      } else {
        // Show an error message if the user's email is not verified
        alert("Please verify your email address.");
      }
    })
    .catch(function(error) {
      // Show an error message if the user's credentials are invalid
      alert("Invalid email or password.");
    });
});
