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
const btn = document.querySelector('.btn');
const info = document.querySelector('.info');
const btnsContainer = document.querySelector('.btnsContainer');
let state = 'client';

btn.addEventListener('click', (e) => {
    btnsContainer.classList.toggle('displayNone');
    info.classList.remove('displayNone');
    const myForm = document.querySelector('.myForm');
    if(state === 'client') {
      myForm.innerHTML += `
          <div class="adresse">
            <label for="">adresse</label>
            <input type="text" placeholder="city" />
            <input type="text" placeholder="province" />
            <input type="text" placeholder="street" />
          </div> 
      `; 
    } else {
      myForm.innerHTML += `

        <div class="description">
          <label for="">description</label>
          <textarea name="" id="" cols="30" rows="10">
            tell about you share your skills project that have did
          </textarea>
        </div> 

        <div class="transport">
          <label>transport</label>
          
            <div class="choice">                  
              <label for="choice1">available</label>
              <input type="radio" value="available" name="transport" />
            </div>

            <div class="choice">
              <label for="choice2">not available</label>
              <input type="radio" value="not" name="transport"/>
            </div>
          
        </div> 

        <div class="tools">
          <label>tools</label>
          
            <div class="choice">                  
              <label for="choice1">available</label>
              <input type="radio" value="available" name="transport" />
            </div>

            <div class="choice">
              <label for="choice2">not available</label>
              <input type="radio" value="not" name="transport"/>
            </div>
          
        </div> 
      `; 
    }
});

let myImg1 = document.getElementById("image1");
let myImg2 = document.getElementById("image2");
let myButton = document.querySelector(".btn");

const imageContainers = document.querySelectorAll('.image-container');
myImg1.onclick = function () {
  state = 'worker';
  myButton.textContent = "as worker";
  imageContainers[0].classList.toggle('clicked');
  imageContainers[1].classList.remove('clicked');
};
myImg2.addEventListener("click", () => {
  state = 'client';
  myButton.textContent = "as client";
  imageContainers[1].classList.toggle('clicked');
  imageContainers[0].classList.remove('clicked');

});


