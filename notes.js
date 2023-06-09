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
