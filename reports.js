// Initialize Firebase
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
    window.location.href = "/website/login.html";
  }
});
