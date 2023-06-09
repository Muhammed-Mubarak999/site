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

// Get the logout button element
var logoutBtn = document.getElementById('logout-btn');

// Add a click event listener to the logout button
logoutBtn.addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    // Redirect to login page
    window.location.href = "login.html";
  }).catch(function(error) {
    // Handle errors
    console.log(error.message);
  });
});

