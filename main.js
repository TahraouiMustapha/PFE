import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
    getFirestore, 
    doc, getDoc, 
    getDocs, collection, 
    updateDoc  
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
//import from our seaarchModule.js
import { onkeyUpHandler, getArrayCategory } from "./searchModule.js";


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
// Variables to track selected category and wilaya
let selectedCategory = '';
let selectedWilaya = '';

// Function to render categories
async function renderCategories(){
    const myCategories = document.querySelector('.categories');
    const array = await getArrayCategory();
    array.forEach((category) => {
        let svgSrc = './icons/' + category + '.svg';
        category = category.charAt(0).toUpperCase() + category.slice(1);
        const categoryElement = createCategorie(category, svgSrc);
        categoryElement.addEventListener('click', (event) => {
            selectedCategory = category;
            renderServices();
        });
        myCategories.appendChild(categoryElement);
    });
}

// Function to render service cards
async function renderServices() {
    const serviceContainer = document.querySelector('.sellers');
    serviceContainer.innerHTML = ''; 
    const arrayOfWorkers = await getWorkers();

    arrayOfWorkers.forEach((worker) => {
        serviceContainer.appendChild(createServiceCard(worker));
    });
}

// Function to create category card
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

// Function to create worker card 
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
        //--create profile part
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
        //--create profile-desc part
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
            star.src = './icons/star.svg';
            const rate = document.createElement('p');
            rate.textContent = worker.rate;
            serviceRate.appendChild(star);
            serviceRate.appendChild(rate);
        serviceCard.appendChild(serviceRate);
    return serviceCard;
}

// Function to get workers from Firebase
async function getWorkers() {
    const myArrayDocuments = await getDocs(collection(db, "workers"));
    const workersArray = [];
    myArrayDocuments.forEach((doc) => {
        const data = doc.data();
        if ((selectedCategory === '' || data.speciality === selectedCategory.toLowerCase()) &&
            (selectedWilaya === '' || data.wilaya === selectedWilaya.toLowerCase())) {
            workersArray.push(data);
        }
    });
    return workersArray;
}

// Function to get workers by wilaya from Firebase
async function getWorkersByWilaya(value) {
    selectedWilaya = value;
    renderServices();
}

// Function to sort workers by transport
function renderServicesSortByTransport(arrayOfWorkers) {
    const serviceContainer = document.querySelector('.sellers');
    serviceContainer.innerHTML = '';
    const workersWithTransport = arrayOfWorkers.filter((worker) => {
        return worker.transport === "available";  
    });
    workersWithTransport.forEach((worker) => {
        serviceContainer.appendChild(createServiceCard(worker));
    });
}

// Function to sort workers by availability
function renderServicesSortByAvailable(arrayOfWorkers) {
    const serviceContainer = document.querySelector('.sellers');
    serviceContainer.innerHTML = '';
    const workersWithAvailability = arrayOfWorkers.filter((worker) => {
        return worker.availability === "available";  
    });
    workersWithAvailability.forEach((worker) => {
        serviceContainer.appendChild(createServiceCard(worker));
    });
}

// Function to create select for wilayas
function createSelectForWilayas() {
    const select = document.getElementById('selectWialaya');
    const locations = [
        "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
        "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
        "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
        "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
        "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj",
        "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
        "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
        "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal",
        "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "Ghar", "Meniaa"
    ];

    locations.forEach((wilaya, index) => {
        const option = document.createElement('option');
        option.value = wilaya;
        option.textContent = `${index + 1} ${wilaya}`;
        select.appendChild(option);
    });

    select.addEventListener('change', (event) => {
        getWorkersByWilaya(event.target.value);
    });
}

// DOMContentLoaded event to initialize everything
document.addEventListener('DOMContentLoaded', async () => {
    await renderCategories();
    createSelectForWilayas();
    
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('search');

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('keyup', () => {
        onkeyUpHandler(searchBar.value);
    });

    const transportBtn = document.getElementById('transportBtn');
    transportBtn.addEventListener('click', async () => {
        const arrayOfWorkers = await getWorkers();
        renderServicesSortByTransport(arrayOfWorkers);
    });

    const availableBtn = document.getElementById('availableBtn');
    availableBtn.addEventListener('click', async () => {
        const arrayOfWorkers = await getWorkers();
        renderServicesSortByAvailable(arrayOfWorkers);
    });

    if (searchValue) {
        renderServices(searchValue);
    } else {
        renderServices('');
    }
});