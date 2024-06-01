// document.addEventListener("DOMContentLoaded", () => {
//   const serviceItems = document.querySelectorAll(".service-item");

//   serviceItems.forEach((item) => {
//     const leftArrow = item.querySelector(".left-click");
//     const rightArrow = item.querySelector(".right-click");
//     const images = item.querySelectorAll(".service-img img");
//     let currentIndex = 0;

//     function updateGallery() {
//       images.forEach((img, index) => {
//         img.classList.toggle("active", index === currentIndex);
//       });
//     }

//     leftArrow.addEventListener("click", () => {
//       if (currentIndex > 0) {
//         currentIndex--;
//       } else {
//         currentIndex = images.length - 1;
//       }
//       updateGallery();
//     });

//     rightArrow.addEventListener("click", () => {
//       if (currentIndex < images.length - 1) {
//         currentIndex++;
//       } else {
//         currentIndex = 0;
//       }
//       updateGallery();
//     });

//     updateGallery(); // Initial display
//   });
// });
// notification

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
