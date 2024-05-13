import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, updateDoc  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";



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
const myDatabase = getFirestore(app);

let currentUser;
let currentUserRef;

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const currentUserUid = user.uid;

      const querySnapshot = await getDocs(collection(myDatabase, "clients"));
        querySnapshot.forEach((doc) => {
          if(currentUserUid === doc.data().uid ) {
            currentUser = doc.data();
            currentUserRef = doc.ref; 
            showClientInfo(currentUser);
          } 
        });

    } else {
      // User is signed out
    }
  });




const editBtn = document.querySelector('.editBtn');
const dialog = document.querySelector('dialog');
editBtn.addEventListener('click', () => {
  dialog.innerHTML = '';
  dialog.showModal();
  //fill user info in our inputs
  dialog.appendChild(createDialogForm(currentUser));
});


function showClientInfo(user) {
 
  const infoSection = document.querySelector('.sec3');
  infoSection.innerHTML = '';
  //create divs to fill information of client
  const fullNameDiv = document.createElement('div'); 
  const adresseDiv = document.createElement('div'); 
  const emailDiv = document.createElement('div'); 
  const phoneNumberDiv = document.createElement('div'); 

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
//create form with the info of user inside dialog
function createDialogForm(user) {
  const form = document.createElement('form');

  const adresseDiv = document.createElement('div');
  adresseDiv.classList.add('adresse');
    //create inputs ta3 province , city ..
    const inputCity = document.createElement('input');
    inputCity.value = user.city;
    const inputProvince = document.createElement('input');
    inputProvince.value = user.province;
    const inputStreet = document.createElement('input');
    inputStreet.value = user.street;

    adresseDiv.appendChild(inputCity);
    adresseDiv.appendChild(inputProvince);
    adresseDiv.appendChild(inputStreet);
  
  const emailInput = document.createElement('input');  
  emailInput.type = 'email';
  emailInput.value = user.email;
  const telInput = document.createElement('input');  
  telInput.type = 'tel';
  telInput.value = user.phoneNumber;

  //div who contains the buttons
  const btnDiv = document.createElement('div');
  btnDiv.classList.add('btnDiv');
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Ok';
    //onclick 3la ok btn
    submitBtn.addEventListener('click', (e)=> {
      e.preventDefault();
      const newData = {
        email: emailInput.value,
        phoneNumber: telInput.value.toString(),
        city: inputCity.value,
        province: inputProvince.value,
        street: inputStreet.value 
      }
      //fonction ta3 firebase ..dir update ll info ta3 user bla matim7i
      updateDoc(currentUserRef, newData);
    })

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      dialog.innerHTML = '';
      dialog.close();
    })

    btnDiv.appendChild(submitBtn);  
    btnDiv.appendChild(closeBtn);  
    btnDiv.style.display = 'flex'; 

  form.appendChild(adresseDiv) ;
  form.appendChild(emailInput);  
  form.appendChild(telInput);
  form.appendChild(btnDiv);  



  return form ;
}

