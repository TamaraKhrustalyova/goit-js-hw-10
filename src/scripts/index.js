
import Notiflix from 'notiflix';
import { getBreeds, fetchCatByBreed} from "./cat-api.js"

const refs = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loadingInfo: document.querySelector('.loader'),
}

document.addEventListener("DOMContentLoaded", onReload)

function onReload(){
    refs.select.classList.remove("visible")
    getBreeds()
    
        .then((cats) => {
            cats.forEach(cat => addOptionToSelect(cat))
            
        })
        .catch ((error) => {
            Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!")
        })
        .finally(() => refs.loadingInfo.remove("visible"))
}

function addOptionToSelect({id, name}){
    optionText = name;
    optionValue = id;
    refs.select.append(new Option(optionText, optionValue));  
}

refs.select.addEventListener("change", onBreedSelected);

function onBreedSelected() {
    
  const selectedBreedId = refs.select.value;
  fetchCatByBreed(selectedBreedId)
    .then((cat) => {
        renderCatInfo(cat[0])
    })
}

function renderCatInfo({breeds, url}) {
    const {temperament, name, description, alt_names} = breeds[0];
    const markup = `
    <div class= "cat-info">
        <div class="image">
            <img class= "cat-img" src="${url}" alt="${alt_names}">
        </div>
        <div class="text-info">
            <h2 class="title">${name}</h2>
            <p class="description">${description}</p>
            <p class="temperament"><b>Temperament:</b> </span>${temperament}</p>
        </div>
    </div>
    `;
   refs.catInfo.innerHTML = markup;
}



