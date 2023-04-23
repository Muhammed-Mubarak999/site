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

