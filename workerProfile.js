document.addEventListener("DOMContentLoaded", () => {
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

  const mainSec = document.querySelector(".main");
  mainSec.appendChild(createServiceTitle(worker.speciality));
  mainSec.appendChild(createServiceContent(worker));
  mainSec.appendChild(createServiceCommande(worker));
});

//func to create service-title div
function createServiceTitle(spec) {
  const myDiv = document.createElement("div");
  myDiv.classList.add("service-title");
  const homeRoadMap = document.createElement("div");
  homeRoadMap.classList.add("home-roadMap");
  const myImg = document.createElement("img");
  myImg.src = "icons/home.svg";
  const ref = document.createElement("p");
  ref.textContent = "Home/ Service card";

  homeRoadMap.appendChild(myImg);
  homeRoadMap.appendChild(ref);

  const serviceName = document.createElement("div");
  serviceName.classList.add("service-name");
  serviceName.textContent = spec.charAt(0).toUpperCase() + spec.slice(1);

  myDiv.appendChild(homeRoadMap);
  myDiv.appendChild(serviceName);
  return myDiv;
}

//func to create service-title div
function createServiceCommande(workerObj) {
  const myDiv = document.createElement("div");
  myDiv.classList.add("service-commande");
  const workerInfoContainer = document.createElement("div");
  workerInfoContainer.classList.add("worker-info-container");
  //create profile div
  workerInfoContainer.appendChild(createProfileDiv(workerObj));
  //create state-btns div
  workerInfoContainer.appendChild(createWorkerState(workerObj));

  const commandeBtn = document.createElement("button");
  commandeBtn.setAttribute("id", "commandeBtn");
  commandeBtn.textContent = "Commande";
  commandeBtn.addEventListener("click", () => {
    if (workerObj.availability) {
      const workerJson = JSON.stringify(workerObj);
      const encodedWorkerJson = encodeURIComponent(workerJson);

      const url = new URL("commande.html", window.location.href);
      url.searchParams.set("worker", encodedWorkerJson);
      window.location.href = url.toString();
    } else {
      showMessageNotAvailable();
    }
  });

  myDiv.appendChild(workerInfoContainer);
  myDiv.appendChild(commandeBtn);

  return myDiv;
}

//func to create service-content div
function createServiceContent(workerObj) {
  const myDiv = document.createElement("div");
  myDiv.classList.add("service-content");
  const serviceGallery = document.createElement("div");
  serviceGallery.classList.add("service-gallery");
  const myImg = document.createElement("img");
  myImg.src = "images/" + workerObj.speciality + ".jpg";

  serviceGallery.appendChild(myImg);

  //create about-service div
  const aboutService = document.createElement("div");
  aboutService.classList.add("about-service");
  const aboutTitle = document.createElement("h2");
  aboutTitle.textContent = "About the service";

  const desc = document.createElement("p");
  desc.textContent = workerObj.desc;

  aboutService.appendChild(aboutTitle);
  aboutService.appendChild(desc);

  myDiv.appendChild(serviceGallery);
  //create service-comment div
  myDiv.appendChild(createServiceComment(workerObj.comments));
  myDiv.appendChild(aboutService);

  return myDiv;
}

//func to create profile div
function createProfileDiv(workerObj) {
  const myDiv = document.createElement("div");
  myDiv.classList.add("profile");
  const personIcon = document.createElement("div");
  personIcon.classList.add("person-icon");
  const myImg = document.createElement("img");
  myImg.src = "icons/account-circle.svg";

  personIcon.appendChild(myImg);

  const workerInfo = document.createElement("div");
  workerInfo.classList.add("worker-info");
  const workerName = document.createElement("p");
  workerName.classList.add("worker-name");
  workerName.textContent = `${workerObj.firstName} ${workerObj.lastName}`;

  const rateDiv = document.createElement("div");
  rateDiv.classList.add("rate");
  rateDiv.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fbbf24" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';

  const rateP = document.createElement("p");
  rateP.textContent = workerObj.rate;

  rateDiv.appendChild(rateP);

  workerInfo.appendChild(workerName);
  workerInfo.appendChild(rateDiv);

  myDiv.appendChild(personIcon);
  myDiv.appendChild(workerInfo);
  return myDiv;
}

//func to create worker state (buttons)
function createWorkerState(workerObj) {
  const myDiv = document.createElement("div");
  myDiv.classList.add("state-btns");

  const transportBtn = document.createElement("button");
  transportBtn.textContent = "Accepte mobility";
  const toolsBtn = document.createElement("button");
  toolsBtn.textContent = "Charging for gear purchases";
  const availableBtn = document.createElement("button");
  availableBtn.textContent = "Available";
  //add checked class
  addCheckedClass(transportBtn, workerObj.transport);
  addCheckedClass(toolsBtn, workerObj.tools);
  addCheckedClass(availableBtn, workerObj.availability);

  myDiv.appendChild(transportBtn);
  myDiv.appendChild(toolsBtn);
  myDiv.appendChild(availableBtn);

  return myDiv;
}

//func to adding class checked to true state
function addCheckedClass(element, state) {
  if (state) {
    element.classList.add("checked");
  } else {
    if (element.classList.contains("checked")) {
      element.classList.remove("checked");
    }
  }
}

//func to create service-comment div
function createServiceComment(arrayOfComments) {
  let i = 0;
  const myDiv = document.createElement("div");
  myDiv.classList.add("service-comment");

  const leftFlach = document.createElement("div");
  leftFlach.classList.add("left");
  leftFlach.classList.add("flach");
  const img1 = document.createElement("img");
  img1.src = "icons/left-flach.svg";

  leftFlach.appendChild(img1);

  leftFlach.addEventListener("click", () => {
    const currentComment = document.querySelector(".comment-container");
    const rightFlach = document.querySelector(".right.flach");
    currentComment.remove();
    rightFlach.insertAdjacentElement(
      "beforebegin",
      createComment(arrayOfComments[i--])
    );
    if (i == -1) i = arrayOfComments.length - 1;
  });

  const rightFlach = document.createElement("div");
  rightFlach.classList.add("right");
  rightFlach.classList.add("flach");
  const img2 = document.createElement("img");
  img2.src = "icons/right-flach.svg";
  rightFlach.appendChild(img2);

  rightFlach.addEventListener("click", () => {
    const currentComment = document.querySelector(".comment-container");
    const rightFlach = document.querySelector(".right.flach");
    currentComment.remove();
    rightFlach.insertAdjacentElement(
      "beforebegin",
      createComment(arrayOfComments[i++])
    );
    if (i == arrayOfComments.length) i = 0;
  });

  myDiv.appendChild(leftFlach);
  //create comment container
  myDiv.appendChild(createComment(arrayOfComments[i]));
  myDiv.appendChild(rightFlach);

  return myDiv;
}

//func to create comment container
function createComment(commentObj) {
  const myDiv = document.createElement("div");
  myDiv.classList.add("comment-container");
  const profile = document.createElement("div");
  profile.classList.add("profile");
  const photoProfile = document.createElement("div");
  photoProfile.classList.add("photo-profile");
  const myImg = document.createElement("img");

  photoProfile.appendChild(myImg);

  const profileName = document.createElement("div");
  profileName.classList.add("profile-name");
  profileName.textContent = commentObj.writerName;

  profile.appendChild(photoProfile);
  profile.appendChild(profileName);

  const commentaire = document.createElement("div");
  commentaire.classList.add("commentaire");
  commentaire.textContent = commentObj.comment;

  myDiv.appendChild(profile);
  myDiv.appendChild(commentaire);

  return myDiv;
}

function showMessageNotAvailable() {
  const body = document.body;
  const myDialog = document.createElement("dialog");

  const message = document.createElement("h2");
  message.textContent = "Worker not currently available";
  myDialog.appendChild(message);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    myDialog.close();
  });
  myDialog.appendChild(closeButton);

  body.appendChild(myDialog);
  myDialog.showModal();
}
// notification

const notification = document.querySelector(".notify .not");
const divvisble = document.querySelector(".not1");
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