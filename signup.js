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

// Firebase database
const database = firebase.database();

// Get references to DOM elements
const signupDiv = document.getElementById("signup");
const signupEmailInput = document.getElementById("signup-email");
const signupPasswordInput = document.getElementById("signup-password");
const nameInput = document.getElementById("name");
const signupBtn = document.getElementById("signup-btn");



// Add event listeners
signupBtn.addEventListener("click", signup);


// Show the signup form
signupDiv.style.display = "block";


// Sign up the user
function signup() {
  const email = signupEmailInput.value;
  const password = signupPasswordInput.value;
  const name = nameInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser;
      user.sendEmailVerification(); // send a verification email to the user's email address

      // Listen for changes to the user's authentication state
      auth.onAuthStateChanged((user) => {
        if (user && user.emailVerified) { // if the user is signed in and their email is verified
          const uid = user.uid;
          database.ref("users/" + uid).set({
            name: name,
            email: email,
            notes: [],
            reports: []
          });
          window.location.href = "notes.html";
        } else if (user) { // if the user is signed in but their email is not verified
          alert("Please verify your email address.");
        }
      });
    })
    .catch(error => alert(error.message));
}
