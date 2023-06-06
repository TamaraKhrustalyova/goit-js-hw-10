import { getBreeds, fetchCatByBreed} from "./cat-api.js"

const refs = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
}

getBreeds()
    .then((cats) => cats.forEach(cat => addOptionToSelect(cat)))
   
    
function addOptionToSelect({id, name}){
    optionText = name;
    optionValue = id;
    refs.select.append(new Option(optionText, optionValue));
}

refs.select.addEventListener("change", onBreedSelected);

function onBreedSelected() {
  const selectedBreedId = refs.select.value;
  console.log(selectedBreedId)
  fetchCatByBreed(selectedBreedId)
    .then((cat) => renderCatInfo(cat[0]))  
}

function renderCatInfo({breeds, url}) {
    const {temperament, name, description, alt_names} = breeds[0];
    const markup = `
    
        <img src="${url}" alt="${alt_names}">
        <h2 class="title">${name}</h2>
        <p class="description">${description}</p>
        <p class="temperament">${temperament}</p>
    `;

   refs.catInfo.innerHTML = markup;
}



