// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs, query } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtMlXjACHE15uExkj50mNk2p2jPwajws0",
    authDomain: "sit378-75044.firebaseapp.com",
    projectId: "sit378-75044",
    storageBucket: "sit378-75044.appspot.com",
    messagingSenderId: "302877337750",
    appId: "1:302877337750:web:0a199e7e132362fa773ab7",
    measurementId: "G-5HXJCFBQNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Function to fetch messages and update UI
async function fetchMessagesAndUpdateUI() {
    const messagesListEl = document.getElementById('messagesList');
    const messagesRef = collection(db, 'contactForm');


    // Fetch messages from Firestore
    const q = query(messagesRef);
    const querySnapshot = await getDocs(q);
    let messagesCount = 0;

    querySnapshot.forEach((doc) => {
        messagesCount++;
        const data = doc.data();
        const timestamp = data.timestamp;

        // Create the list item HTML
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item list-group-item-action';
        listItem.setAttribute('data-bs-toggle', 'modal');
        listItem.setAttribute('data-bs-target', '#messageDetailModal');
        listItem.innerHTML = `
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1" style="color: #587B7F; font-weight: bold; font-size: 1.25rem;">${data.subject}</h5>
        <small>${timestamp}</small>
    </div>
    <p class="mb-1">${data.message}</p>
`;


        // Set the click handler for the list item
        listItem.onclick = () => {
            document.getElementById('modalSubject').textContent = data.subject;
            document.getElementById('modalFullName').textContent = data.fullName;
            document.getElementById('modalEmail').textContent = data.emailAddress;
            document.getElementById('modalMessage').textContent = data.message;
            document.getElementById('modalTimestamp').textContent = timestamp;
        };

        // Append the new list item to the list
        messagesListEl.appendChild(listItem);
    });

    // Update messages count title
    document.querySelector('.card-title').textContent = `You have ${messagesCount} new messages`;
}

// Call the function to fetch messages and update the UI
fetchMessagesAndUpdateUI();
