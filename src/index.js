// import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";


import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_y93JF5d0g1wRGcfrQtzrygacDWrb0A3StZkiB2CW48e50u7WneMRxFx9q5nyIgQt";


export function fetchBreeds() {
  const url = "https://api.thecatapi.com/v1/breeds";
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}


export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}


const breedSelect = document.querySelector(".breed-select");
