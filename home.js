// start crafting
const craftingImage = document.querySelector("#craftingImage .crafting-photo");
const craftingImages = [
  "./images/lhaj.png",
  "./images/li ma thebbouche.png",
  "./images/hada nas mlah.png",
];

let currentIndex = 0;

// Fonction pour changer l'image toutes les 4 secondes
function changeCraftingImage() {
  craftingImage.src = craftingImages[currentIndex];
  currentIndex = (currentIndex + 1) % craftingImages.length;
}

// Commencez le diaporama immédiatement
changeCraftingImage();

// Changez l'image toutes les 4 secondes
setInterval(changeCraftingImage, 4000);

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

var swiper = new Swiper(".services-main", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: false,
  centeredSlides: false,
  grabCursor: true,
  slidesPerGroupSkip: 1,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
    draggable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  on: {
    reachEnd: function () {
      document.querySelector(".swiper-button-next").style.display = "hidden";
      document.querySelector(".swiper-scrollbar").style.display = "none";
      document.querySelector(".swiper-button-prev").style.display = "block";
    },
    reachBeginning: function () {
      document.querySelector(".swiper-button-prev").style.display = "none";
      document.querySelector(".swiper-scrollbar").style.display = "none";
      document.querySelector(".swiper-button-next").style.display = "block";
    },
    fromEdge: function () {
      document.querySelector(".swiper-button-next").style.display = "block";
      document.querySelector(".swiper-button-prev").style.display = "block";
      document.querySelector(".swiper-scrollbar").style.display = "block";
    },
    slideChange: function () {
      updateSwiperButtons(swiper);
    },
  },
});

// Function to update the navigation buttons and scrollbar state
function updateSwiperButtons(swiper) {
  if (swiper.isBeginning) {
    document.querySelector(".swiper-button-prev").style.display = "none";
    document.querySelector(".swiper-scrollbar").style.display = "none";
  } else if (swiper.isEnd) {
    document.querySelector(".swiper-button-next").style.display = "none";
    document.querySelector(".swiper-scrollbar").style.display = "none";
  } else {
    document.querySelector(".swiper-button-next").style.display = "block";
    document.querySelector(".swiper-button-prev").style.display = "block";
    document.querySelector(".swiper-scrollbar").style.display = "block";
  }
}

// Initialize Swiper and update buttons on init
swiper.on("init", function () {
  updateSwiperButtons(swiper);
});

// Initialize Swiper
swiper.init();
swiper.update(); // Ensure Swiper is updated to reflect initial state

// Add a manual check in case the initial state is not correctly set
if (swiper.isEnd) {
  document.querySelector(".swiper-button-next").style.display = "none";
  document.querySelector(".swiper-scrollbar").style.display = "none";
}
if (swiper.isBeginning) {
  document.querySelector(".swiper-button-prev").style.display = "none";
  document.querySelector(".swiper-scrollbar").style.display = "none";
}
