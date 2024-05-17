import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
    getFirestore, 
    doc, getDoc, 
    getDocs, collection, 
    updateDoc  
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const db = getFirestore(app);
//end inisialize firebase


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('search');
    
    if (searchValue) {
        console.log('Search value:', searchValue);
    }
});