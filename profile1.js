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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const myDatabase = getFirestore(app);

//end initialise firebase

let currentUser;
let currentUserRef;

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
  } else {
    // User is signed out
  }
});

function showProfileInfo(user) {
  const infoSection = document.querySelector(".profileBelka");
  infoSection.innerHTML = "";
  //create divs to fill information of client
    const profilePic = document.createElement('div');
    profilePic.classList.add('profile-pic');
      const myImg = document.createElement('img');
      myImg.src = "./images/profile1.jpg";
      profilePic.appendChild(myImg);
    const fullName = document.createElement("h2");
    fullName.textContent = `${user.firstName} ${user.lastName}`;
    const descP = document.createElement("p");
    descP.textContent = user.desc;
    const contactInfo = document.createElement('div');
    contactInfo.classList.add('contact-info');
      const addresse = document.createElement('p');
        const addresseStrong = document.createElement('strong');
        addresseStrong.textContent = "Adresse:";
        addresse.appendChild(addresseStrong);
        addresse.innerHTML += `${user.wilaya}`;

      const emailP = document.createElement('p');
        const emailStrong = document.createElement('strong');
        emailStrong.textContent = "Email:";
        emailP.appendChild(emailStrong);
        emailP.innerHTML += `${user.email}`;
      
      const phoneP = document.createElement('p');
        const phoneStrong = document.createElement('strong');
        phoneStrong.textContent = "Phone:";
        phoneP.appendChild(phoneStrong);
        phoneP.innerHTML += `${user.phoneNumber}`;  
        
    contactInfo.appendChild(addresse);  
    contactInfo.appendChild(emailP);  
    contactInfo.appendChild(phoneP); 

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('btn');

  infoSection.appendChild(profilePic);
  infoSection.appendChild(fullName);
  infoSection.appendChild(descP);
  infoSection.appendChild(contactInfo);
  infoSection.appendChild(editBtn);
}

//function to show services of worker
function showWorkerServices(user) {
  const servicesGrid = document.querySelector('.services-grid');
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


const notification = document.querySelector(".notify .not");
const divvisble = document.querySelector(" .not1");
function one() {
  if (divvisble.style.display === "block") {
    divvisble.style.display = "none";
  } else {
    divvisble.style.display = "block";
  }
}
notification.onclick = one;
// out ta3 profile
const out = document.querySelector(".photo-profile img");
const logout = document.querySelector(".logout");

out.addEventListener("click", function () {
  logout.style.display = logout.style.display === "none" ? "block" : "none";
});