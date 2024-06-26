import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  query,
  where,
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

//end initialise firebase

let currentUser;
let currentUserRef;

let isWorker = false;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in
    const currentUserUid = user.uid;

    const querySnapshot = await getDocs(collection(myDatabase, "workers"));
    querySnapshot.forEach((doc) => {
      if (currentUserUid === doc.data().uid) {
        currentUser = doc.data();
        currentUserRef = doc.ref;
      }
    });
    showProfileInfo(currentUser);
    showWorkerServices(currentUser);
    
    ifThereNew(currentUser);

    
  } else {
    // User is signed out
  }
});

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keyup", () => {
  onkeyUpHandler(searchBar.value);
});

function showProfileInfo(user) {
  const infoSection = document.querySelector(".profileBelka");
  infoSection.innerHTML = "";
  //create divs to fill information of client
  const profilePic = document.createElement("div");
  profilePic.classList.add("profile-pic");
  const myImg = document.createElement("img");
  myImg.src = "./images/profile1.jpg";
  profilePic.appendChild(myImg);
  const fullName = document.createElement("h2");
  fullName.textContent = `${user.firstName} ${user.lastName}`;
  const descP = document.createElement("p");
  descP.textContent = user.desc;
  const contactInfo = document.createElement("div");
  contactInfo.classList.add("contact-info");
  const addresse = document.createElement("p");
  const addresseStrong = document.createElement("strong");
  addresseStrong.textContent = "Adresse:";
  addresse.appendChild(addresseStrong);
  addresse.innerHTML += `${user.wilaya}`;

  const emailP = document.createElement("p");
  const emailStrong = document.createElement("strong");
  emailStrong.textContent = "Email:";
  emailP.appendChild(emailStrong);
  emailP.innerHTML += `${user.email}`;

  const phoneP = document.createElement("p");
  const phoneStrong = document.createElement("strong");
  phoneStrong.textContent = "Phone:";
  phoneP.appendChild(phoneStrong);
  phoneP.innerHTML += `${user.phoneNumber}`;

  contactInfo.appendChild(addresse);
  contactInfo.appendChild(emailP);
  contactInfo.appendChild(phoneP);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("btn");

  infoSection.appendChild(profilePic);
  infoSection.appendChild(fullName);
  infoSection.appendChild(descP);
  infoSection.appendChild(contactInfo);
  infoSection.appendChild(editBtn);
}

//function to show services of worker
function showWorkerServices(user) {
  const servicesGrid = document.querySelector(".services-grid");
  servicesGrid.appendChild(createServiceCard(user));
}

//function to create service card
function createServiceCard(worker) {
  const serviceCard = document.createElement("div");
  serviceCard.classList.add("service-card");
  //--create service gallery part
  const serviceGallery = document.createElement("div");
  serviceGallery.classList.add("service-gallery");
  const workImage = document.createElement("div");
  workImage.classList.add("work-image");
  //image ta3 work example
  const img = document.createElement("img");
  img.src = "./images/" + worker.speciality + ".jpg";
  workImage.appendChild(img);
  serviceGallery.appendChild(workImage);
  serviceCard.appendChild(serviceGallery);
  //--create profile part
  const profile = document.createElement("div");
  profile.classList.add("profile");
  //div photo profile
  const photoProfile = document.createElement("div");
  photoProfile.classList.add("photoProfile");
  //hna nzid img ta3 siyid
  const profileName = document.createElement("p");
  profileName.classList.add("profile-name");
  profileName.textContent = worker.firstName + " " + worker.lastName;
  profile.appendChild(photoProfile);
  profile.appendChild(profileName);
  serviceCard.appendChild(profile);
  //--create profile-desc part
  const profileDesc = document.createElement("div");
  profileDesc.classList.add("profile-desc");
  const desc = document.createElement("p");
  desc.textContent = worker.desc;
  profileDesc.appendChild(desc);
  serviceCard.appendChild(profileDesc);
  //--create service-rate part
  const serviceRate = document.createElement("div");
  serviceRate.classList.add("service-rate");
  const star = document.createElement("img");
  star.src = "./icons/star.svg";
  const rate = document.createElement("p");
  rate.textContent = worker.rate;
  serviceRate.appendChild(star);
  serviceRate.appendChild(rate);
  serviceCard.appendChild(serviceRate);

  serviceCard.addEventListener("click", () => {
    const workerJson = JSON.stringify(worker);
    const encodedWorkerJson = encodeURIComponent(workerJson);

    const url = new URL("workerProfile.html", window.location.href);
    url.searchParams.set("worker", encodedWorkerJson);
    window.location.href = url.toString();
  });

  return serviceCard;
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

async function getClientObj(userUid) {
  const querySnapshot = await getDocs(collection(myDatabase, "clients"));
  console.log(userUid);
  for (const doc of querySnapshot.docs) {
    if (userUid === doc.data().uid) {
      return doc.data();
    }
  }
  return null;
}

async function getCommandeObj(userUid) {
  const querySnapshot = await getDocs(collection(myDatabase, "projects"));
  for (const doc of querySnapshot.docs) {
    if (userUid === doc.data().workerId) {
      return doc.data();
    }
  }
  return null;
}

//function to create not1
async function createCommande(commandeObj) {
  const myDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = 'Commande';

    const p = document.createElement('p');
    const worker = await getWorkerObj(commandeObj.workerId);
    p.textContent = worker.firstName;

    const btn = document.createElement('button');
    btn.textContent = 'Accept';
    btn.classList.add('acceptBtn');
    btn.addEventListener('click' ,()=>{
      acceptCommande(commandeObj.workerId, commandeObj.clientid);
    })

    const btnRefuse = document.createElement('button');
    btnRefuse.textContent = 'Refuse';
    btnRefuse.classList.add('refuseBtn');
    btnRefuse.addEventListener('click', ()=>{
      refuseCommande(commandeObj.workerId);
    })

    myDiv.appendChild(h2);
    myDiv.appendChild(p);
    myDiv.appendChild(btn);
    myDiv.appendChild(btnRefuse);

  return myDiv;
}

//function accept coomande
async function acceptCommande(workerId, clientId) {
  const divvisble1 = document.querySelector(".not1-container");
  divvisble1.innerHTML = '';
  const myWorker = await getWorkerObj(workerId);
  const myClient = await getClientObj(clientId);

  const workerDoc = await getWorkerDocByUid(workerId);
  if (workerDoc) {
    const workerRef = doc(myDatabase, "workers", workerDoc.id); // Get the document reference
    await updateDoc(workerRef, {
      availability: false,
      hasNew: false
    });
  }
}

async function refuseCommande(workerId) {
  const divvisble1 = document.querySelector(".not1-container");
  divvisble1.innerHTML = '';
  const myWorker = await getWorkerObj(workerId);

  const workerDoc = await getWorkerDocByUid(workerId);
  const clientDoc = await getClientDocByUid(clientId);

  if (workerDoc) {
    const workerRef = doc(myDatabase, "workers", workerDoc.id);
    await updateDoc(workerRef, {
      hasNew: false
    });
  }

  if (clientDoc) {
    const clientRef = doc(myDatabase, "clients", clientDoc.id); 
    await updateDoc(clientRef, {
      hasNew: false
    });
  }
}



async function getWorkerDocByUid(uid) {
  const workersQuery = query(collection(myDatabase, "workers"), where("uid", "==", uid));
  const querySnapshot = await getDocs(workersQuery);
  if (!querySnapshot.empty) {
    const workerDoc = querySnapshot.docs[0]; // Assuming uid is unique, we take the first match
    return workerDoc;
  }
  return null;
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



const divvisble = document.querySelector(".not1");

//func to check if there new
async function ifThereNew(user) {
  const jaras = document.querySelector(".jaras");
  if (user.hasNew) {
    jaras.setAttribute("id", "notificationIcon");
    const divvisble1 = document.querySelector(".not1-container");
    let commandeObj = await getCommandeObj(currentUser.uid);
    let divJdid = await createCommande(commandeObj);
    divvisble1.appendChild(divJdid);
  }
}

const notification = document.querySelector(".notify .not");

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

logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("Error scigning out: ", error);
    });
});

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