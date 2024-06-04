import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
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

async function onkeyUpHandler(inputValue) {
  if (inputValue !== "") {
    const mySpecialityArray = await getArrayCategory();
    const myResult = compareInputWithSpec(inputValue, mySpecialityArray);
    editResultBoxSize(myResult.length);
    if (inputValue !== "") {
      sendResults(myResult);
    }
  } else {
    makeResultBoxDisappear();
  }
}

async function onkeyUpHandlerSamePage(inputValue) {
  if (inputValue !== "") {
    const mySpecialityArray = await getArrayCategory();
    const myResult = compareInputWithSpec(inputValue, mySpecialityArray);
    editResultBoxSize(myResult.length);
    if (inputValue !== "") {
      sendResultsSamePage(myResult);
    }
  } else {
    makeResultBoxDisappear();
  }
}

//function to get array of categories
async function getArrayCategory() {
  const myArrayDocuments = await getDocs(collection(db, "workers"));
  let specialitySet = new Set(); //automatically removes duplicates

  myArrayDocuments.forEach((doc) => {
    let data = doc.data();
    specialitySet.add(data.speciality);
  });

  return Array.from(specialitySet);
}

//function to compare the input value m3a specialityies
function compareInputWithSpec(inputValue, array) {
  let newArray = array.filter((spec) => {
    return spec.startsWith(inputValue);
  });

  return newArray.length > 5 ? newArray.splice(5) : newArray;
}

//function to send the results to result box ta3 input
function sendResults(array) {
  createResultBox(array);
}
//function to send the results to result box ta3 same page
function sendResultsSamePage(array) {
  const resultBox = document.querySelector(".result-box");
  resultBox.innerHTML = "";
  resultBox.style.display = "block";

  const myUl = document.createElement("ul");
  array.forEach((res) => {
    let myLi = document.createElement("li");
    myLi.textContent = res;
    myLi.addEventListener("click", (e) => {
    });

    myUl.appendChild(myLi);
  });
  if (array.length !== 0) {
    resultBox.appendChild(myUl);
  }

}

function createResultBox(array) {
  const resultBox = document.querySelector(".result-box");
  resultBox.innerHTML = "";
  resultBox.style.display = "block";

  const myUl = document.createElement("ul");
  array.forEach((res) => {
    let myLi = document.createElement("li");
    myLi.textContent = res;
    myLi.addEventListener("click", (e) => {
      const searchValue = e.target.textContent;
      //URLSearchParams to include the search value in the URL
      const url = new URL("main.html", window.location.href);
      url.searchParams.set("search", searchValue);
      window.location.href = url.toString();
    });

    myUl.appendChild(myLi);
  });
  if (array.length !== 0) {
    resultBox.appendChild(myUl);
  }
}

function makeResultBoxDisappear() {
  const resultBox = document.querySelector(".result-box");
  resultBox.style.display = "none";
}

//to edit result box height
function editResultBoxSize(numberOfResult) {
  const resultBox = document.querySelector(".result-box ");
  if (numberOfResult === 0) {
    resultBox.style.display = "none";
  } else {
    resultBox.style.height = `calc(${numberOfResult} * 45px);`;
  }
}
export { onkeyUpHandler, 
  onkeyUpHandlerSamePage, 
  makeResultBoxDisappear,
  getArrayCategory };
