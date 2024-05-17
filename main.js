import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
    getFirestore, 
    doc, getDoc, 
    getDocs, collection, 
    updateDoc  
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
//import from our seaarchModule.js
import { getArrayCategory } from "./searchModule.js";


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


document.addEventListener('DOMContentLoaded', async () => {
    //render categories
    renderCategories();
    //render servicesCard
    renderServices();
    

    //njib search value mn profile
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('search');
    
    if (searchValue) {
        console.log('Search value:', searchValue);
    }
});


//function to render the categories 
async function renderCategories(){
    const myCategories = document.querySelector('.categories');
    const array = await getArrayCategory();
    console.log(array);
    array.forEach((categorie) => {
        let svgSrc = './icons/' + categorie + '.svg';
        categorie = categorie.charAt(0).toUpperCase() + categorie.slice(1);
        myCategories.appendChild(createCategorie(categorie, svgSrc));
    });
}

//function to render service cards
async function renderServices() {
    const serviceContainer = document.querySelector('.sellers');
    const arrayOfWorkers = await getWorkers();

    arrayOfWorkers.forEach((worker) => {
        serviceContainer.appendChild(createServiceCard(worker));
    });
}

//function to create categorie card
function createCategorie(title, iconSrc) {
    const myCategorie = document.createElement('div');
    myCategorie.classList.add('categorie');
        const myIconDiv = document.createElement('div');
        myIconDiv.classList.add('categorie-icon');
            const myImgSvg = document.createElement('img');
            myImgSvg.src = iconSrc;

            myIconDiv.appendChild(myImgSvg);

        const myCatName = document.createElement('p');
        myCatName.classList.add('categorie-name'); 
        myCatName.textContent = title; 

        myCategorie.appendChild(myIconDiv);
        myCategorie.appendChild(myCatName);

    return myCategorie;
}

//function to create worker card 
function createServiceCard(worker) {
    const serviceCard = document.createElement('div');
    serviceCard.classList.add('service-card');
        //--create service gallery part
        const serviceGallery = document.createElement('div');
        serviceGallery.classList.add('service-gallery');
            const workImage = document.createElement('div');
            workImage.classList.add('work-image');
            //image ta3 work example
                const img = document.createElement('img');

                workImage.appendChild(img);

            serviceGallery.appendChild(workImage);
        serviceCard.appendChild(serviceGallery);
        //--craete profile part
        const profile = document.createElement('div');
        profile.classList.add('profile');
            //div photo profile
            const photoProfile = document.createElement('div');
            photoProfile.classList.add('photoProfile');
            //hna nzid img ta3 siyid

            const profileName = document.createElement('p');
            profileName.classList.add('profile-name');
            profileName.textContent = worker.firstName +' '+ worker.lastName;


            profile.appendChild(photoProfile);
            profile.appendChild(profileName);

        serviceCard.appendChild(profile);
        // --create profile -desc part
        const profileDesc = document.createElement('div');
        profileDesc.classList.add('profile-desc');
            const desc = document.createElement('p');
            desc.textContent = worker.desc;

            profileDesc.appendChild(desc);

        serviceCard.appendChild(profileDesc);

        //--create service-rate part
        const serviceRate = document.createElement('div');
        serviceRate.classList.add('service-rate');
            const star = document.createElement('img');
            star.src = './images/star.svg';

            const rate = document.createElement('p');
            rate.textContent = 'worker.rate';
            
            serviceRate.appendChild(star);
            serviceRate.appendChild(rate);

        serviceCard.appendChild(serviceRate);


    return serviceCard;
}

//function to get workers fromm firebase
async function getWorkers() {
    const myArrayDocuments = await getDocs(collection(db, "workers"));
    const workersArray = [];

    myArrayDocuments.forEach((doc) => {
        workersArray.push(doc.data());
    });
    return workersArray;
}
