import { getBreeds, fetchCatByBreed} from "./cat-api.js"

const refs = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
}

getBreeds()
    // .then((cats) => console.log(cats))
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
    .then((cat) => console.log(cat))
    // .then((cat) => renderCatInfo(cat))  
}

function renderCatInfo({temperament, description, name, image}) {
    return `
        <p>${description}</p>
        // <img src="${image}">
        // <h2>${name}</h2>
        // <p>${temperament}</p>
    `;
}

// let catMarkup = renderCatInfo;
// function apdateCatInfo(){
//     refs.catInfo.innerHTML = catMarkup;
// }

