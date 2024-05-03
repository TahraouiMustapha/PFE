
const btn = document.querySelector('.btn');
const info = document.querySelector('.info');
const btnsContainer = document.querySelector('.btnsContainer');

// hadi bah na3raf wach 5ayar
let state = 'client';

const myImg1 = document.getElementById("image1");
const myImg2 = document.getElementById("image2");
const myButton = document.querySelector(".btn");

const imageContainers = document.querySelectorAll('.image-container');
myImg1.addEventListener ('click', () => {
  state = 'worker';
  img1Handler();
});

myImg2.addEventListener("click", () => {
  state = 'client';
  img2Handler();
});

//switch pages logic

btn.addEventListener('click', () => {
    switchPagesHandler();
})


function switchPagesHandler() {
    btnsContainer.classList.toggle('displayNone');
    info.classList.remove('displayNone');
    const myForm = document.querySelector('.myForm');
    if(state === 'client') {
      myForm.innerHTML += `
          <div class="adresse">
            <label for="">adresse</label>
            <input type="text" placeholder="city" />
            <input type="text" placeholder="province" />
            <input type="text" placeholder="street" />
          </div> 
      `; 
    } else {
      myForm.innerHTML += `

        <div class="description">
          <label for="">description</label>
          <textarea name="" id="" cols="30" rows="10">
            tell about you share your skills project that have did
          </textarea>
        </div> 

        <div class="transport">
          <label>transport</label>
          
            <div class="choice">                  
              <label for="choice1">available</label>
              <input type="radio" value="available" name="transport" />
            </div>

            <div class="choice">
              <label for="choice2">not available</label>
              <input type="radio" value="not" name="transport"/>
            </div>
          
        </div> 

        <div class="tools">
          <label>tools</label>
          
            <div class="choice">                  
              <label for="choice1">available</label>
              <input type="radio" value="available" name="transport" />
            </div>

            <div class="choice">
              <label for="choice2">not available</label>
              <input type="radio" value="not" name="transport"/>
            </div>
          
        </div> 
      `; 
    }
}

function img1Handler() {
    myButton.textContent = "as worker";
    imageContainers[0].classList.toggle('clicked');
    imageContainers[1].classList.remove('clicked');
}

function img2Handler() {
    myButton.textContent = "as client";
    imageContainers[1].classList.toggle('clicked');
    imageContainers[0].classList.remove('clicked');
}