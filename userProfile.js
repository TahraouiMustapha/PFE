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
  signOut,
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
        showClientInfo(currentUser);
      }
    });

    ifThereNew(currentUser);

  } else {
    // User is signed out
  }
});

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keyup", (e) => {
  onkeyUpHandler(e.targe.value);
});

const editBtn = document.querySelector(".editBtn");
const dialog = document.querySelector("dialog");
editBtn.addEventListener("click", () => {
  dialog.innerHTML = "";
  dialog.showModal();
  //fill user info in our inputs
  dialog.appendChild(createDialogForm(currentUser));
});


function createMessage(worker) {
  const myDiv = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.textContent = 'Commande Status';

  const p = document.createElement('p');
  p.textContent = worker.firstName;

  const btn = document.createElement('div');
  btn.textContent = 'Accepted!';

  const close = document.createElement('button');
  close.textContent = 'close';
  close.classList.add('closeBtn');
  close.addEventListener('click', ()=>{
    closeCommande();
  })

    myDiv.appendChild(h2);
    myDiv.appendChild(p);
    myDiv.appendChild(btn);
    myDiv.appendChild(close);
  
    const divvisble1 = document.querySelector(".not1-container");
    divvisble1.appendChild(myDiv);
}

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
//create form with the info of user inside dialog
function createDialogForm(user) {
  const form = document.createElement("form");

  const adresseDiv = document.createElement("div");
  adresseDiv.classList.add("adresse");
  //create inputs ta3 province , city ..
  const inputCity = document.createElement("input");
  inputCity.value = user.city;
  const inputProvince = document.createElement("input");
  inputProvince.value = user.province;
  const inputStreet = document.createElement("input");
  inputStreet.value = user.street;

  adresseDiv.appendChild(inputCity);
  adresseDiv.appendChild(inputProvince);
  adresseDiv.appendChild(inputStreet);

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.value = user.email;
  const telInput = document.createElement("input");
  telInput.type = "tel";
  telInput.value = user.phoneNumber;

  //div who contains the buttons
  const btnDiv = document.createElement("div");
  btnDiv.classList.add("btnDiv");
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Ok";
  //onclick 3la ok btn
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newData = {
      email: emailInput.value,
      phoneNumber: telInput.value.toString(),
      city: inputCity.value,
      province: inputProvince.value,
      street: inputStreet.value,
    };
    //fonction ta3 firebase ..dir update ll info ta3 user bla matim7i
    updateDoc(currentUserRef, newData);
  });

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.innerHTML = "";
    dialog.close();
  });
  btnDiv.appendChild(submitBtn);
  btnDiv.appendChild(closeBtn);
  btnDiv.style.display = "flex";

  form.appendChild(adresseDiv);
  form.appendChild(emailInput);
  form.appendChild(telInput);
  form.appendChild(btnDiv);

  return form;
}

//func to check if there new
async function ifThereNew(user) {
  const jaras = document.querySelector(".jaras");

  if (user.hasNew) {
    jaras.setAttribute("id", "notificationIcon");
    const divvisble1 = document.querySelector(".not1-container");
    let commandeObj = await getCommandeObj(currentUser.uid);
    const worker = await getWorkerObj(commandeObj.workerId);
    console.log(worker);
     createMessage(worker);
  }
}
// notification
const notification = document.querySelector(".notify .not");
const divvisble = document.querySelector(" .not1");

function one() {
  const jaras = document.querySelector(".jaras");
  jaras.removeAttribute("id");
  if (divvisble.style.display === "block") {
    divvisble.style.display = "none";
  } else {
    divvisble.style.display = "block";
  }
}

notification.addEventListener("click", () => {
  one();
});

// out ta3 profile
const out = document.querySelector(".photo-profile img");
const logout = document.querySelector(".logout");

out.addEventListener("click", function () {
  logout.style.display = logout.style.display === "none" ? "block" : "none";
});

logout.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log("User signed out successfully");
    window.location.href = "home.html";
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
})

// ta3 kalb
let kalb = document.querySelector(".klb");

function changeFillColor() {
  let heartPath = document.querySelector(".heart-path");
  let currentFill = heartPath.style.fill;
  if (currentFill === "red") {
    heartPath.style.fill = "black";
    heartPath.style.stroke = "black";
    heartPath.style.strokeWidth = "2";
  } else {
    heartPath.style.fill = "red";
    heartPath.style.stroke = "none";
  }
}
kalb.onclick = changeFillColor;


async function getCommandeObj(userUid) {
  const querySnapshot = await getDocs(collection(myDatabase, "projects"));
  for (const doc of querySnapshot.docs) {
    if (userUid === doc.data().clientid) {
      return doc.data();
    }
  }
  return null;
}

async function closeCommande(clientId) {
  const divvisble1 = document.querySelector(".not1-container");
  divvisble1.innerHTML = "";

  const clientDoc = await getClientDocByUid(clientId);
  if (clientDoc) {
    const clientRef = doc(myDatabase, "clients", clientDoc.id); 
    await updateDoc(clientRef, {
      hasNew: false
    });
  }
}

async function getClientDocByUid(uid) {
  const workersQuery = query(collection(myDatabase, "clients"), where("uid", "==", uid));
  const querySnapshot = await getDocs(workersQuery);
  if (!querySnapshot.empty) {
    const workerDoc = querySnapshot.docs[0]; // Assuming uid is unique, we take the first match
    return workerDoc;
  }
  return null;
}

async function getWorkerObj(userUid) {
  const querySnapshot = await getDocs(collection(myDatabase, "workers"));
  for (const doc of querySnapshot.docs) {
    if (userUid === doc.data().uid) {
      return doc.data();
    }
  }
  return null;
}
