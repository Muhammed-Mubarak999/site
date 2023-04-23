// Initialize Firebase
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

// Get references to Firebase services
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// Check if user is authenticated
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, enable report form
    const reportForm = document.getElementById("report-form");
    reportForm.addEventListener("submit", (event) => {
      event.preventDefault(); // prevent default form submission behavior

      // Get form data
      const title = reportForm.elements.title.value;
      const severity = reportForm.elements.severity.value;
      const description = reportForm.elements.description.value;
      const attachment = reportForm.elements.attachment.files[0];

      // Create a new report object to store in Firebase Realtime Database
      const newReport = {
        title,
        severity,
        description,
        timestamp: Date.now(),
        uid: user.uid // Add user ID to report object
      };

      // Upload attachment to Firebase Storage (if any)
      if (attachment) {
        const storageRef = storage.ref().child(`attachments/${attachment.name}`);
        storageRef.put(attachment).then((snapshot) => {
          newReport.attachmentUrl = snapshot.downloadURL;
          // Save report object to Firebase Realtime Database
          database.ref("reports").push(newReport);
        });
      } else {
        // Save report object to Firebase Realtime Database
        database.ref("reports").push(newReport);
      }

      // Reset form
      reportForm.reset();
    });

    // Display list of existing reports
    const reportsList = document.getElementById("reports-list");
    database.ref("reports").on("value", (snapshot) => {
      reportsList.innerHTML = ""; // clear existing list
      snapshot.forEach((childSnapshot) => {
        const reportKey = childSnapshot.key;
        const reportData = childSnapshot.val();
        // Create a new list item element
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${reportData.title} (${reportData.severity})</span>
          <button data-report-key="${reportKey}">Delete</button>
        `;
        // Handle delete button click
        const deleteButton = li.querySelector("button");
        deleteButton.addEventListener("click", () => {
          database.ref(`reports/${reportKey}`).remove();
        });
        // Append list item element to reports list
        reportsList.appendChild(li);
      });
    });
  } else {
    // User is not signed in, redirect to login page
    window.location.href = "/test/login.html";
  }
});
