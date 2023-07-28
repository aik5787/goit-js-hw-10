import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_y93JF5d0g1wRGcfrQtzrygacDWrb0A3StZkiB2CW48e50u7WneMRxFx9q5nyIgQt";


import { fetchBreeds, fetchCatByBreed } from "./cat-api.jss"


const breedSelect = document.querySelector(".breed-select");
