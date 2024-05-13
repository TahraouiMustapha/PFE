import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const myDatabase = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in
    const currentUserUid = user.uid;

    const querySnapshot = await getDocs(collection(myDatabase, "clients"));
    querySnapshot.forEach((doc) => {
      if (currentUserUid === doc.data().uid) {
        const currentUser = doc.data();
        showClientInfo(currentUser);
      }
    });
  } else {
    // User is signed out
  }
});

function showClientInfo(user) {
  const infoSection = document.querySelector(".sec3");
  infoSection.innerHTML = "";
  //create divs to fill information of client
  const fullNameDiv = document.createElement("div");
  const adresseDiv = document.createElement("div");
  const emailDiv = document.createElement("div");
  const phoneNumberDiv = document.createElement("div");

  fullNameDiv.textContent = `Full Name: ${user.firstName} ${user.lastName}`;
  adresseDiv.textContent = `Adresse: ${user.city}\ ${user.province}\ ${user.street}`;
  emailDiv.textContent = `Email: ${user.email}`;
  phoneNumberDiv.textContent = `Phone number: ${user.phoneNumber}`;

  //put the divs inside infoSection
  infoSection.appendChild(fullNameDiv);
  infoSection.appendChild(adresseDiv);
  infoSection.appendChild(emailDiv);
  infoSection.appendChild(phoneNumberDiv);
}
