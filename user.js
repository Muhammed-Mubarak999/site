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

// Reference to the root of your database
var rootRef = firebase.database().ref();

// Reference to the currently logged in user's data
var currentUserRef;

// Function to handle logout
function logout() {
  firebase.auth().signOut().then(function() {
    // Redirect the user to the login page
    window.location.href = "login.html";
  }).catch(function(error) {
    console.error(error);
  });
}

// Function to handle change password
function changePassword() {
  var newPassword = prompt("Enter your new password:");

  // Check if the user entered a password
  if (newPassword) {
    // Update the user's password
    firebase.auth().currentUser.updatePassword(newPassword).then(function() {
      console.log("Password updated successfully.");
    }).catch(function(error) {
      console.error(error);
    });
  }
}

// Function to handle edit profile
function editProfile() {
  var newName = prompt("Enter your new name:");
  var newEmail = prompt("Enter your new email:");

  // Check if the user entered a name and email
  if (newName && newEmail) {
    // Update the user's data in the database
    currentUserRef.update({
      name: newName,
      email: newEmail
    }).then(function() {
      console.log("Profile updated successfully.");
    }).catch(function(error) {
      console.error(error);
    });
  }
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function(event) {
  // Check if the user is logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Get a reference to the current user's data in the database
      currentUserRef = firebase.database().ref("users/" + user.uid);

      // Add event listeners for the logout, change password, and edit profile buttons
      document.getElementById("logoutBtn").addEventListener("click", logout);
      document.getElementById("changePasswordBtn").addEventListener("click", changePassword);
      document.getElementById("editProfileBtn").addEventListener("click", editProfile);

      // Display the user's name on the page
      currentUserRef.once("value", function(snapshot) {
        document.getElementById("welcomeMsg").innerHTML = "Hello, " + snapshot.val().name + "!";
      });
    } else {
      // Redirect the user to the login page
      window.location.href = "login.html";
    }
  });
});
