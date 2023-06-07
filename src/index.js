import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { getBreeds, fetchCatByBreed} from "./js/cat-api.js"

const refs = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loadingInfo: document.querySelector('.loader'),
}

document.addEventListener("DOMContentLoaded", onReload)

function onReload(){
    refs.loadingInfo.classList.remove('is-hidden')

    getBreeds()
        .then((cats) => {
            cats.forEach(cat => addOptionToSelect(cat))
            refs.select.classList.remove('is-hidden')
            refs.loadingInfo.classList.add('is-hidden')
        })
        // .catch ((error) => {
        //     Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!")
        // })
}

function addOptionToSelect({id, name}){
    // optionText = name;
    // optionValue = id;
    // refs.select.append(new Option(optionText, optionValue));  
    const option = `<option value="${id}">${name}</option>`
    refs.select.insertAdjacentHTML('beforeend', option);
}

refs.select.addEventListener("change", onBreedSelected);

function onBreedSelected() {
   
  const selectedBreedId = refs.select.value;
  refs.loadingInfo.classList.remove('is-hidden');
  refs.catInfo.classList.add('is-hidden');

  fetchCatByBreed(selectedBreedId)
    .then((cat) => {
        renderCatInfo(cat[0])
        refs.loadingInfo.classList.remove('is-hidden')
        refs.loadingInfo.classList.add('is-hidden');
        refs.catInfo.classList.remove('is-hidden');
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



