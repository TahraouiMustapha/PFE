// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOa527QiPGbAmOXtbG99sBoKmwGpTrE6k",
  authDomain: "projet-fin-d-etude-975b7.firebaseapp.com",
  databaseURL: "https://projet-fin-d-etude-975b7-default-rtdb.firebaseio.com",
  projectId: "projet-fin-d-etude-975b7",
  storageBucket: "projet-fin-d-etude-975b7.appspot.com",
  messagingSenderId: "919112985393",
  appId: "1:919112985393:web:7d9c3545b45b52584dde10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const signIn = document.querySelector("#signIn");

signIn.addEventListener("click", (event) => {
  event.preventDefault(); //hadi bah lsubmit mati5dimch (form matru7ech l server)
  signInUserHandler();
});

function signInUserHandler() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in hna mrigla d5al
      const user = userCredential.user;
      window.location.href = "./main.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //errorMessage hada lerror
    });
}
