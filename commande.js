//initialise firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
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
import { Project } from "./ourClasses.js";

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
    const urlParams = new URLSearchParams(window.location.search);
    const workerJson = urlParams.get("worker");
    let worker;
    if (workerJson) {
      try {
        worker = JSON.parse(decodeURIComponent(workerJson));
      } catch (e) {
        console.error("Error parsing worker JSON:", e);
      }
    }
    // User is signed in
    const currentUserUid = user.uid;
    const workerUid = worker.uid;

    const querySnapshot = await getDocs(collection(myDatabase, "clients"));
    querySnapshot.forEach((doc) => {
      if (currentUserUid === doc.data().uid) {
        currentUser = doc.data();
        currentUserRef = doc.ref;
      }
    });
    //add event listener
    const submitBtn = document.querySelector(".sub");
    let myProject;
    submitBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      myProject = handleCreateProject(currentUserUid, workerUid);
      changeHasNew(workerUid);
      //store the project in database
      try {
        const docRef = await addDoc(
          collection(myDatabase, "projects"),
          myProject.toPlainObject()
        );
        showMessageOrderCompleted();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });

    fillInfo(currentUser);
  } else {
    // User is signed out
  }
});

//func to fill client info
function fillInfo(user) {
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const phoneNumber = document.querySelector("#phoneNumber");
  const state = document.querySelector("#state");
  const city = document.querySelector("#city");
  const province = document.querySelector("#province");
  const street = document.querySelector("#street");

  firstName.value = user.firstName;
  lastName.value = user.lastName;
  phoneNumber.value = user.phoneNumber;
  state.value = user.wilaya;
  city.value = user.city;
  province.value = user.province;
  street.value = user.street;
}

function handleCreateProject(clientid, workerId) {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const state = document.querySelector("#state").value;
  const budget = document.querySelector("#budget").value;
  const city = document.querySelector("#city").value;
  const province = document.querySelector("#province").value;
  const street = document.querySelector("#street").value;
  const date = document.querySelector("#time").value;
  const desc = document.querySelector("#description").value;

  let newProject = new Project(
    generateRandomId(),
    clientid,
    workerId,
    date,
    budget,
    desc
  );
  return newProject;
}

//function to create a random id
function generateRandomId(length = 25) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let randomId = "";
  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return randomId;
}

//function to show a message of success
function showMessageOrderCompleted() {
  const body = document.body;
  const myDialog = document.createElement("dialog");

  const message = document.createElement("h2");
  message.textContent = "The order was completed successfully";
  myDialog.appendChild(message);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    myDialog.close();
    window.history.back();
  });
  myDialog.appendChild(closeButton);

  body.appendChild(myDialog);
  myDialog.showModal();
}

//function to change hasNew variable in worker 
async function changeHasNew(workerUid) {
  let currentWorker;
  let docRef;
  const querySnapshot = await getDocs(collection(myDatabase, "workers"));
  querySnapshot.forEach((doc) => {
    if (workerUid === doc.data().uid) {
      currentWorker = doc.data();
      docRef = doc.ref;  
    }
  });


  await updateDoc(docRef, { hasNew: true });

}
// function ta3  notification 
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