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
const serv = document.querySelectorAll(".service");
//end initialise firebase

onAuthStateChanged(auth, async (user) => {
  const seeMoreUser = document.querySelector(".see-more a");
  const cat = document.querySelectorAll(".categorie a");
  const rech = document.querySelector(".input .recherche");

  if (user) {
    // User is signed in
    const currentUserUid = user.uid;
    console.log(currentUserUid); //hada uid li fi authentification
    seeMoreUser.addEventListener("click", function () {
      window.location.href = "main.html";
    });

    cat.forEach((link) => {
      link.addEventListener("click", function () {
        window.location.href = "main.html";
      });
    });
    rech.addEventListener("click", function () {
      // iktb ta3 recherche
    });

    serv.forEach((service) => {
      service.addEventListener("click", function () {
        window.location.href = "main.html";
      });
    });
  } else {
    // User is signed out
    seeMoreUser.addEventListener("click", function () {
      window.location.href = "./CreateANewAccount.html";
    });
    cat.forEach((link) => {
      link.addEventListener("click", function () {
        window.location.href = "./CreateANewAccount.html";
      });
    });
    rech.addEventListener("click", function () {
      window.location.href = "./CreateANewAccount.html";
    });

    serv.forEach((service) => {
      service.addEventListener("click", function () {
        window.location.href = "./CreateANewAccount.html";
      });
    });
  }
});

// start crafting

const craftingImage = document.querySelector("#craftingImage .crafting-photo");
const craftingImages = [
  "./images/lhaj.png",
  "./images/li ma thebbouche.png",
  "./images/hada nas mlah.png",
];
let currentIndex = 0;
// Fonction pour changer image toutes les 4 secondes
function changeCraftingImage() {
  craftingImage.src = craftingImages[currentIndex];
  currentIndex = (currentIndex + 1) % craftingImages.length;
}
changeCraftingImage();
// Changez l'image toutes les 4 secondes
setInterval(changeCraftingImage, 4000);
// end crafting
//  start populat service
const swiper = new Swiper(".swiper-container", {
  slidesPerView: "auto", // Affiche autant de slides que possible par vue
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

swiper.on("reachEnd", function () {
  // Désactiver le bouton "next" lorsque vous atteignez la dernière slide
  swiper.navigation.$nextEl.addClass("swiper-button-disabled");
});

swiper.on("fromEdge", function () {
  // Réactiver le bouton "next" lorsque vous n'êtes pas sur la dernière slide
  swiper.navigation.$nextEl.removeClass("swiper-button-disabled");
});

// end popular service
// start categorie

// end categorie
// start top servise
//hdi mtbdache tkhdm hta yt3mre mhtwa sfha
document.addEventListener("DOMContentLoaded", () => {
  // ychdlk wche kayn ga3 info f secvice card kaml les service card
  const serviceCards = document.querySelectorAll(".service-card");
  // dir repitition
  serviceCards.forEach((card) => {
    const leftClick = card.querySelector(".left-click .hover");
    const rightClick = card.querySelector(".right-click .hover");
    const images = card.querySelectorAll(".work-image img");
    let currentIndex = 0; // counteur wzid ta3 soura lwla

    // Function to update image visibility

    const updateImages = () => {
      images.forEach((img, index) => {
        // tdir loperation l kaml tsawre
        img.classList.toggle("active", index === currentIndex); // dir classe active l tswira li index=cureentIndex
      });
    };

    // Left click event
    leftClick.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex -= 1;
        updateImages();
      }
    });

    // Right click event
    rightClick.addEventListener("click", () => {
      if (currentIndex < images.length - 1) {
        currentIndex += 1;
        updateImages();
      }
    });

    // Initial update to show the first image in refrreche
    updateImages();
  });
});
// end top service
// start best sellers

// Cette variable représente l'index du premier vendeur affiché dans la liste
let startIndex = 0;

// Cette fonction permet de faire défiler les vendeurs vers la gauche ou vers la droite
function scrollBestSellers(direction) {
  const sellers = document.querySelectorAll(".seller-card");
  const maxIndex = sellers.length - 1;
  const increment = 6; // Nombre de vendeurs à afficher à chaque clic

  if (direction === "left") {
    startIndex = Math.max(startIndex - increment, 0);
  } else if (direction === "right") {
    startIndex = Math.min(startIndex + increment, maxIndex - increment + 1);
  }

  // Affichage des vendeurs correspondant à l'index actuel
  for (let i = 0; i < sellers.length; i++) {
    if (i >= startIndex && i < startIndex + increment) {
      sellers[i].style.display = "flex";
    } else {
      sellers[i].style.display = "none";
    }
  }
}

// Ajout des écouteurs d'événements sur les boutons de défilement
document
  .querySelector(".left-arrow")
  .addEventListener("click", () => scrollBestSellers("left"));
document
  .querySelector(".right-arrow")
  .addEventListener("click", () => scrollBestSellers("right"));

// Affichage des premiers vendeurs au chargement de la page
scrollBestSellers("left"); // Vous pouvez également choisir 'right' si vous préférez commencer par la droite

//  end sellers
// start tips
// fonction kima ta3 crafting
const tipsImage = document.querySelector(".tips .tips-photo");
const tipsImages = [
  "./images/1tips.jpg",
  "./images/2tips.png",
  "./images/3tips.jpg",
  "./images/7tips.jpg",
  "./images/8tips.webp",
  "./images/9tips.jpg",
  "./images/10tips.jpeg",
  "./images/11tips.jpg",
];
let tipsIndex = 0;

function changeTipsImage() {
  tipsImage.src = tipsImages[tipsIndex];
  tipsIndex = (tipsIndex + 1) % tipsImages.length;
}

// Changer l'image toutes les 2 secondes
setInterval(changeTipsImage, 2000);
// end tips
// start comments
// Sélection des éléments HTML des boutons

// Cette variable représente l'index du premier commentaire affiché dans la liste
let cIndex = 0;

// Cette fonction permet de faire défiler les commentaires vers la gauche ou vers la droite
function scrollComments(direction) {
  const comments = document.querySelectorAll(".comment");
  const maxIndex = comments.length - 1;
  const increment = 1; // Nombre de commentaires à afficher à chaque clic

  if (direction === "left") {
    cIndex = Math.max(cIndex - increment, 0);
  } else if (direction === "right") {
    cIndex = Math.min(cIndex + increment, maxIndex - increment + 1);
  }

  // Affichage des commentaires correspondant à l'index actuel
  for (let i = 0; i < comments.length; i++) {
    if (i >= cIndex && i < cIndex + increment) {
      comments[i].classList.add("active");
    } else {
      comments[i].classList.remove("active");
    }
  }
}

// Ajout des écouteurs d'événements sur les boutons de défilement
document
  .querySelector(".comments-main .left-arrow")
  .addEventListener("click", () => scrollComments("left"));
document
  .querySelector(".comments-main .right-arrow")
  .addEventListener("click", () => scrollComments("right"));

// Affichage du premier commentaire au chargement de la page
scrollComments("left"); // Vous pouvez également choisir 'right' si vous préférez commencer par la droite
