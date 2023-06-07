
const API_KEY = "live_lxn9abov0vj4J5dtCXBrWLbM7jh1qwtgy1kx1743hz5EqD4PvkKIW5gej7h4ry6x";

function getBreeds(){
    const url = `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`
    return fetch(url)
    .then (res => res.json())
 }

 function fetchCatByBreed(breedId){
  const url = `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  return fetch(url)
  .then (res => res.json())
}

 export { getBreeds, fetchCatByBreed };


