// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
