var swiper = new Swiper(".services-main", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: false,
  centeredSlides: "true",
  fade: "true",
  grabCursor: "true",
  slidesPerGroupSkip: 1,
  grabCursor: true,
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
});
const craftingImage = document.querySelector("#craftingImage .crafting-photo");
const craftingImages = [
  "./images/client.png",
  "./images/ee.png",
  "./images/chef-chantier.png",
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
