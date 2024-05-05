import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, updateDoc  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
  
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
// hadi bah na3raf wach 5ayar
let state = 'client';

//firebase function 
onAuthStateChanged(auth, async(user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      const submitBtn = document.querySelector('#submitBtn');
      submitBtn.addEventListener('click', () => {
        if(state === 'client'){
          addClientInfo(uid);
        } else {
          addWorkerInfo();
        }
      }) 

    } else {
      // User is signed out
      // ...
    }
  });


const btn = document.querySelector('.btn');
const info = document.querySelector('.info');
const btnsContainer = document.querySelector('.btnsContainer');


const myImg1 = document.getElementById("image1");
const myImg2 = document.getElementById("image2");
const myButton = document.querySelector(".btn");

const imageContainers = document.querySelectorAll('.image-container');
myImg1.addEventListener ('click', () => {
  state = 'worker';
  img1Handler();
});

myImg2.addEventListener("click", () => {
  state = 'client';
  img2Handler();
});

//switch pages logic

btn.addEventListener('click', () => {
    switchPagesHandler();
})


function addClientInfo(clientId) {
  const firstName = document.querySelector('#first-name').value;
  const lastName = document.querySelector('#last-name').value;
  const phoneNumber = document.querySelector('#phone-number').value;
  const wilaya = document.querySelector('#wilaya').value;
  //addresse
  const city = document.querySelector('#city');
  const province = document.querySelector('#province');
  const street = document.querySelector('#street');

  const clientRef = doc(db, 'users', clientId);
  console.log(clientRef);
}

function addWorkerInfo() {
  console.log('addworkerINfo');
}

function switchPagesHandler() {
    btnsContainer.classList.toggle('displayNone');
    info.classList.remove('displayNone');
    const myForm = document.querySelector('.myForm');
    if(state === 'client') {
      myForm.innerHTML += `
          <div class="adresse">
            <label for="">adresse</label>
            <input type="text" id="city" placeholder="city" />
            <input type="text" id="province" placeholder="province" />
            <input type="text" id="street" placeholder="street" />
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
}

function img1Handler() {
    myButton.textContent = "as worker";
    imageContainers[0].classList.toggle('clicked');
    imageContainers[1].classList.remove('clicked');
}

function img2Handler() {
    myButton.textContent = "as client";
    imageContainers[1].classList.toggle('clicked');
    imageContainers[0].classList.remove('clicked');
}