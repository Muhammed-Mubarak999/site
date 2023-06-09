// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC1KWnW5P6NSLelJTrxb9TG8srodutO9Y",
  authDomain: "secirityx.firebaseapp.com",
  projectId: "secirityx",
  storageBucket: "secirityx.appspot.com",
  messagingSenderId: "215784175374",
  appId: "1:215784175374:web:236450bbc2e0c7d50a495f",
  measurementId: "G-MJRZHJK8P7"
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
