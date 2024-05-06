import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, addDoc, collection  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

// hadi bah na3raf wach 5ayar
let state = 'client';

const submitBtn = document.querySelector('#submitBtn');

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
});

//firebase authentification
const auth = getAuth();
const db = getFirestore(app);

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const firstName = document.querySelector('#first-name').value;
  const lastName = document.querySelector('#last-name').value;
  const phoneNumber = document.querySelector('#phone-number').value;
  const wilaya = document.querySelector('#wilaya2').value;
  //ki y5ayar ymarki as client (database)
  if(state === 'client') {
    const city = document.querySelector('#city').value; 
    const province = document.querySelector('#province').value; 
    const street = document.querySelector('#street').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert('mrigla');
        //add data
        try {
          const docRef = await addDoc(collection(db, "try"), {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            wilaya: wilaya,
            city: city,
            province: province,
            street: street,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);

      });
        
  } else {//ki y5ayar ymarki as worker
    const desc = document.querySelector('#description').value;
    //njib lea variable ta3 tools w transport
    const transportValues = document.getElementsByName('transport');
    const toolsValues = document.getElementsByName('tools');

    const transport = transportValues[0].checked ? transportValues[0].value : transportValues[1].value;
    const tools = toolsValues[0].checked ? toolsValues[0].value : toolsValues[1].value;

     let newUser = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      wilaya: wilaya,
      desc: desc,
      transport: transport,
      tools: tools
     }; 

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert('mrigla worker');
        //add in database
        try {
          const docRef = await addDoc(collection(db, "users"), newUser);
          
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });


  } 
})


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
          <label for="description">description</label>
          <textarea name="description" id="description" cols="30" rows="10">
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
              <input type="radio" value="available" name="tools" />
            </div>

            <div class="choice">
              <label for="choice2">not available</label>
              <input type="radio" value="not" name="tools"/>
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