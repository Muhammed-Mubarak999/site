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
// Firebase database
const database = firebase.database();

// Get references to DOM elements
const notesDiv = document.getElementById("notes");
const notesList = document.getElementById("notes-list");
const noteTitleInput = document.getElementById("note-title");
const noteDescriptionInput = document.getElementById("note-description");
const addNoteBtn = document.getElementById("add-note-btn");
const logoutBtn = document.getElementById("logout-btn");

// Add event listeners
addNoteBtn.addEventListener("click", addNote);
logoutBtn.addEventListener("click", logout);

// Show the notes section
notesDiv.style.display = "block";
loadNotes();

// Log out the user
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

// Add a note
function addNote() {
  const user = auth.currentUser;
  const uid = user.uid;
  const title = noteTitleInput.value;
  const description = noteDescriptionInput.value;

  database.ref("users/" + uid + "/notes").push({ title, description })
    .then(() => {
      noteTitleInput.value = "";
      noteDescriptionInput.value = "";
      loadNotes();
    })
    .catch(error => alert(error.message));
}

// Load notes
function loadNotes() {
  const user = auth.currentUser;
  const uid = user.uid;

  notesList.innerHTML = "";

  database.ref("users/" + uid + "/notes").once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const note = childSnapshot.val();
        const li = document.createElement("li");
        li.innerHTML = `<h3>${note.title}</h3><p>${note.description}</p><button onclick="deleteNote('${key}')">Delete</button>`;
        notesList.appendChild(li);
      });
    })
    .catch(error => alert(error.message));
}

// Delete a note
function deleteNote(key) {
  const user = auth.currentUser;
  const uid = user.uid;

  database.ref("users/" + uid + "/notes/" + key).remove()
    .then(() => {
      loadNotes();
    })
    .catch(error => alert(error.message));
}
