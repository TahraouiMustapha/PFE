//initialise firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
//import from out module
import { onkeyUpHandler } from "./searchModule.js";

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
//end initialise firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const myDatabase = getFirestore(app);

let currentUser;
let currentUserRef;

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const currentUserUid = user.uid;
  
      const querySnapshot = await getDocs(collection(myDatabase, "clients"));
      querySnapshot.forEach((doc) => {
        if (currentUserUid === doc.data().uid) {
          currentUser = doc.data();
          currentUserRef = doc.ref;
        } 
    });
    
    fillInfo(currentUser);
    } else {
      // User is signed out
    }
  });


//func to fill client info
function fillInfo(user) {
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const phoneNumber = document.querySelector('#phoneNumber');
    const state = document.querySelector('#state');
    const city = document.querySelector('#city');
    const province = document.querySelector('#province');
    const street = document.querySelector('#street');
    
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    phoneNumber.value = user.phoneNumber;
    state.value = user.wilaya;
    city.value = user.city;
    province.value = user.province;
    street.value = user.street;
}


  