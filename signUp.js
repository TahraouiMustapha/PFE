// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOa527QiPGbAmOXtbG99sBoKmwGpTrE6k",
  authDomain: "projet-fin-d-etude-975b7.firebaseapp.com",
  databaseURL: "https://projet-fin-d-etude-975b7-default-rtdb.firebaseio.com",
  projectId: "projet-fin-d-etude-975b7",
  storageBucket: "projet-fin-d-etude-975b7.appspot.com",
  messagingSenderId: "919112985393",
  appId: "1:919112985393:web:7d9c3545b45b52584dde10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
//event click 
const signUp = document.querySelector('#signUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();//hadi bah form matib3athch w yasra error
    createNewUserHandler();
})

function createNewUserHandler() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    //function mn fire base 
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed up 
          const user = userCredential.user;
          alert('signed up');
          //logic for database:
          try {
            const docRef = await addDoc(collection(db, "users"), {
              email: email,
            });
            // hadi bah tjib id ta3 doc :docRef.id
          } catch (e) {
            // e huwa naw3 l error
          }
          window.location.href = './asWorkerAsClient.html';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          //catch the errors
          alert(errorMessage);
        });
}
