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

var startIndex = 0; //  wchmn page rak
var pageSize = 6; //  chale mn vendeur f page

function scrollBestSellers(direction) {
  var sellers = document.querySelectorAll(".seller-card");

  // thsb 3dd les page btkrib ll a3la bach ydkhl f hsab sellers f page lkhra
  var totalPages = Math.ceil(sellers.length / pageSize);

  // Si la direction est vers la gauche
  if (direction === "left") {
    // Décrémenter l'indice de départ pour revenir à la page précédente
    startIndex = Math.max(0, startIndex - pageSize);
  } else if (direction === "right") {
    // Incrémenter l'indice de départ pour passer à la page suivante
    startIndex += pageSize;

    // bah ki ykmo sellers thbs la page
    if (startIndex >= sellers.length) {
      // Fixer l'indice de départ à la première position de la dernière page
      startIndex = (totalPages - 1) * pageSize;
    }
  }

  // Masquer tous les vendeurs
  sellers.forEach(function (seller) {
    seller.style.display = "none";
  });

  // Afficher les vendeurs de la page actuelle
  for (
    var i = startIndex;
    i < Math.min(startIndex + pageSize, sellers.length);
    i++
  ) {
    sellers[i].style.display = "flex";
  }
}

// Appel initial pour afficher les premiers vendeurs
scrollBestSellers(); // Affiche les six premiers vendeurs au chargement initial

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
function scrollComments(direction) {
  var comments = document.querySelectorAll(".comment");
  var activeIndex = -1; // mkan hta commentair

  // hwse 3la lindex ta3 comment li fih active class wdiro activeIndex
  comments.forEach(function (comment, index) {
    if (comment.classList.contains("active")) {
      activeIndex = index;
    }
  });

  // Si aucun commentaire n'est actif, activer le premier commentaire
  if (activeIndex === -1 && comments.length > 0) {
    comments[0].classList.add("active");
    return;
  }

  // Désactiver le commentaire actuel
  comments[activeIndex].classList.remove("active");

  // yhsb index jdid 3la hsab dirction si ymin yzid whd wmyfoutche 3dd cmnt si ysar ynks whs w myhbtche tht 0
  var newIndex;
  if (direction === "left") {
    newIndex = Math.max(0, activeIndex - 1);
  } else if (direction === "right") {
    newIndex = Math.min(comments.length - 1, activeIndex + 1);
  }

  // Activer le nouveau commentaire
  comments[newIndex].classList.add("active");
}
