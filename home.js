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
// ======================================================================================================================
var swiper = new Swiper(".services-main", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: false,
  centeredSlides: false, // Désactiver le centrage des slides
  fade: false, // Désactiver le fade
  slidesPerGroupSkip: 1,
  slidesPerGroup: 1, // Changer un slide à la fois
  keyboard: {
    enabled: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Commenter ou supprimer la pagination si non nécessaire
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  //   dynamicBullets: true,
  // },
  on: {
    reachEnd: function () {
      this.allowSlideNext = false; // Empêche de continuer à scroller après le dernier slide
    },
    slideChange: function () {
      if (this.isEnd) {
        this.allowSlideNext = false; // Empêche de continuer à scroller après le dernier slide
      } else {
        this.allowSlideNext = true; // Permet le scrolling si on n'est pas à la fin
      }
    },
  },
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
// start best sellers

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

  // Désactiver le commentaire actuel
  comments[activeIndex].classList.remove("active");

  // Calculer le nouvel index en fonction de la direction
  var newIndex;
  if (direction === "left") {
    newIndex = activeIndex === 0 ? comments.length - 1 : activeIndex - 1;
  } else if (direction === "right") {
    newIndex = activeIndex === comments.length - 1 ? 0 : activeIndex + 1;
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
