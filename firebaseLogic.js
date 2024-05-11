// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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
const database = getDatabase(app);

const auth = getAuth();

const signUp = document.querySelector('#signUp');
signUp.addEventListener('click', () => {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            //fill in database
            set(ref(database, 'users/' + user.uid), {
                email: email, 
            })
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //Catch the errors
        });
});

//jibt les button (as worker w as client)






