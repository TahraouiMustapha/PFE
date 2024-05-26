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

// var swiper = new Swiper(".services-main", {
//   slidesPerView: 3,
//   spaceBetween: 25,
//   loop: false,
//   centeredSlides: "true",
//   fade: "true",
//   grabCursor: "true",
//   slidesPerGroupSkip: 1,
//   grabCursor: true,
//   keyboard: {
//     enabled: true,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     520: {
//       slidesPerView: 2,
//     },
//     950: {
//       slidesPerView: 3,
//     },
//   },
//   scrollbar: {
//     el: ".swiper-scrollbar",
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     dynamicBullets: true,
//   },
// });
// ===============================================================================================================
// var swiper = new Swiper(".services-main", {
//   slidesPerView: 3,
//   spaceBetween: 25,
//   loop: false,
//   centeredSlides: true,
//   fade: true,
//   slidesPerGroupSkip: 1,
//   keyboard: {
//     enabled: true,
//   },

//   scrollbar: {
//     el: ".swiper-scrollbar",
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     dynamicBullets: true,
//   },
// });
// ======================================================================================================================$$*
// const swiper = new Swiper(".swiper-container", {
//   slidesPerView: 1,
//   spaceBetween: 10,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   breakpoints: {
//     640: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     768: {
//       slidesPerView: 3,
//       spaceBetween: 40,
//     },
//     1024: {
//       slidesPerView: 4,
//       spaceBetween: 50,
//     },
//   },
// });
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

// =======================================================================================================================
// end popular service
// start categorie
// function addCategory() {
//   const categoriesMain = document.getElementById("categoriesMain");
//   const newCategory = document.createElement("div");
//   newCategory.className = "categorie";
//   newCategory.innerHTML = `
//     <div class="categorie-icon">
//       <img src="./icons/new-icon.svg" alt="">
//     </div>
//     <p class="categorie-name">New Category</p>
//   `;
//   categoriesMain.appendChild(newCategory);
// }

// function removeCategory() {
//   const categoriesMain = document.getElementById("categoriesMain");
//   if (categoriesMain.lastElementChild) {
//     categoriesMain.removeChild(categoriesMain.lastElementChild);
//   }
// }

// end categorie
// start top servise
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    const leftClick = card.querySelector(".left-click .hover");
    const rightClick = card.querySelector(".right-click .hover");
    const images = card.querySelectorAll(".work-image img");
    let currentIndex = 0;

    // Function to update image visibility
    const updateImages = () => {
      images.forEach((img, index) => {
        img.classList.toggle("active", index === currentIndex);
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

    // Initial update to show the first image
    updateImages();
  });
});
// end top service
// start best sellers

var startIndex = 0; // Indice de départ pour les vendeurs affichés
var pageSize = 6; // Nombre de vendeurs à afficher par page

function scrollBestSellers(direction) {
  var sellers = document.querySelectorAll(".seller-card");

  // Calcul du nombre total de pages
  var totalPages = Math.ceil(sellers.length / pageSize);

  // Si la direction est vers la gauche
  if (direction === "left") {
    // Décrémenter l'indice de départ pour revenir à la page précédente
    startIndex = Math.max(0, startIndex - pageSize);
  } else if (direction === "right") {
    // Incrémenter l'indice de départ pour passer à la page suivante
    startIndex += pageSize;

    // Vérifier si on dépasse la fin de la liste
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

// Changer l'image toutes les 4 secondes
setInterval(changeTipsImage, 2000);

// start comments
function scrollComments(direction) {
  var comments = document.querySelectorAll(".comment");
  var activeIndex = -1;

  // Trouver l'index du commentaire actuellement actif
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

  // Calculer le nouvel index en fonction de la direction
  var newIndex;
  if (direction === "left") {
    newIndex = Math.max(0, activeIndex - 1);
  } else if (direction === "right") {
    newIndex = Math.min(comments.length - 1, activeIndex + 1);
  }

  // Activer le nouveau commentaire
  comments[newIndex].classList.add("active");
}

// =====******************************************=

//  start populat service
// var swiper = new Swiper(".services-main", {
//   slidesPerView: 3,
//   spaceBetween: 25,
//   loop: false,
//   centeredSlides: "true",
//   fade: "true",
//   grabCursor: "true",
//   slidesPerGroupSkip: 1,
//   grabCursor: true,
//   keyboard: {
//     enabled: true,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     520: {
//       slidesPerView: 2,
//     },
//     950: {
//       slidesPerView: 3,
//     },
//   },
//   scrollbar: {
//     el: ".swiper-scrollbar",
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     dynamicBullets: true,
//   },
// });
// Sélectionnez l'élément avec la classe "services-main"
