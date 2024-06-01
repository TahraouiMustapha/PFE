const { debounce } = require("lodash");

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workerJson = urlParams.get('worker');
    let worker;
    if (workerJson) {
        try {
            worker = JSON.parse(decodeURIComponent(workerJson)); 
            console.log(worker);
        } catch (e) {
            console.error('Error parsing worker JSON:', e);
        }
    }
    

    const mainSec = document.querySelector('.main');
    mainSec.appendChild(createServiceTitle(worker.speciality));


});

//func to create service-title div
function createServiceTitle(spec) {
    const myDiv = document.createElement('div');
    myDiv.classList.add('service-title');
        const homeRoadMap = document.createElement('div');
        homeRoadMap.classList.add('home-roadMap');
            const myImg = document.createElement('img');
            myImg.src = "icons/home.svg";
            const ref = document.createElement('p');
            ref.textContent = 'Home/ Service card'; 

            homeRoadMap.appendChild(myImg);
            homeRoadMap.appendChild(ref);
        
        const serviceName = document.createElement('div');
        serviceName.classList.add('service-name');
        serviceName.textContent = spec.charAt(0).toUpperCase() + spec.slice(1);    

        myDiv.appendChild(homeRoadMap);
        myDiv.appendChild(serviceName);
    return myDiv;
}

//func to create service-title div
function createServiceCommande(workerObj) {
    const myDiv = document.createElement('div');
    myDiv.classList.add('service-commande');
        const workerInfoContainer = document.createElement('div');
        workerInfoContainer.classList.add('worker-info-container');        
        //create profile div
            workerInfoContainer.appendChild(createProfileDiv(workerObj));
        //create state-btns div



        const commandeBtn = document.createElement('button');
        commandeBtn.setAttribute('id', 'commandeBtn');
        
        myDiv.appendChild(workerInfoContainer);
        myDiv.appendChild(commandeBtn);

    return myDiv;
}

function createProfileDiv(workerObj) {
    const myDiv = document.createElement('div');
    myDiv.classList.add('profile');
        const personIcon = document.createElement('div');
        personIcon.classList.add('person-icon');
            const myImg = document.createElement('img');
            myImg.src = 'icons/account-circle.svg';

            personIcon.appendChild(myImg);

        const workerInfo = document.createElement('div');
        workerInfo.classList.add('worker-info');
            const workerName = document.createElement('p');
            workerName.classList.add('worker-name');
            workerName.textContent = `${workerObj.firstName} ${workerObj.lastName}`;
            
            const rateDiv = document.createElement('div');
            rateDiv.classList.add('rate');
            rateDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fbbf24" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
    
                const rateP = document.createElement('p');
                rateP.textContent = workerObj.rate;

                rateDiv.appendChild(rateP);

            workerInfo.appendChild(workerName);
            workerInfo.appendChild(rateDiv);


        myDiv.appendChild(personIcon);
        myDiv.appendChild(workerInfo);
    return myDiv;
}

function createWorkerState(workerObj) {
    const myDiv = document.createElement('div');
    myDiv.classList.add('state-btns');

    const transportBtn = document.createElement('button');
    const toolsBtn = document.createElement('button');
    const availableBtn = document.createElement('button');


    return myDiv;
}


