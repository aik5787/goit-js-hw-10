import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'



import { fetchBreeds, fetchCatByBreed } from "./cat-api.js"


const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

function showLoader() {
    loader.style.display = "block"; 
  breedSelect.style.display = "none";
  catInfoDiv.style.display = "none";
}

function hideLoader() {
   loader.style.display = "none";
  breedSelect.style.display = "block";
  catInfoDiv.style.display = "block";
}

function showError() {
  error.style.display = "block";
}

function hideError() {
  error.style.display = "none";
}

 

document.addEventListener("DOMContentLoaded", () => {
  breedSelect.removeEventListener("change", onBreedSelectChange);  
  fillBreedsSelect();
});

function fillBreedsSelect() {
    hideError();
    showLoader();
  fetchBreeds()
    .then(response => {
      const breedOptions = response.map(breed => {
       return { value: breed.id, text: breed.name }});
         const slimSelect = new SlimSelect({
    select: '.breed-select',
    data: breedOptions,
  });
      hideLoader();
       breedSelect.addEventListener("change", onBreedSelectChange);
        
    })
    .catch(error => {
        Notiflix.Notify.failure("Error getting breeds data");
        hideLoader();
        showError();
        
    });
};


function onBreedSelectChange() {
    hideError();
    showLoader();
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
      .then(response => {
          displayCatInfo(response);
          hideLoader();
      })
      .catch(error => {
      Notiflix.Notify.failure("Error getting cat data");
          catInfoDiv.innerHTML = "";
          hideLoader();
          showError();
      });
};

function displayCatInfo(catData) {
  const { url: catImage, breeds: [{ name: catName, description: catDescription, temperament: catTemperament }] } = catData[0];

  const catInfo = `
    <img src="${catImage}" alt="${catName}" width="400">
    <div class="text-wrapper">
      <p class="text"><span class="text-name">Name:</span> ${catName}</p>
      <p class="text"><span class="text-name">Description:</span> ${catDescription}</p>
      <p class="text"><span class="text-name">Temperament:</span> ${catTemperament}</p>
    </div>
  `;

  catInfoDiv.innerHTML = catInfo;
}












// Без библиотек

// import { fetchBreeds, fetchCatByBreed } from "./cat-api.js"


// const breedSelect = document.querySelector(".breed-select");
// const catInfoDiv = document.querySelector(".cat-info");
// const loader = document.querySelector(".loader");
// const error = document.querySelector(".error");

// function showLoader() {
//     loader.style.display = "block"; 
//   breedSelect.style.display = "none";
//   catInfoDiv.style.display = "none";
// }

// function hideLoader() {
//    loader.style.display = "none";
//   breedSelect.style.display = "block";
//   catInfoDiv.style.display = "block";
// }

// function showError() {
//   error.style.display = "block";
// }

// function hideError() {
//   error.style.display = "none";
// }

 

// document.addEventListener("DOMContentLoaded", () => {
//   fillBreedsSelect();
//     breedSelect.addEventListener("change", onBreedSelectChange);  
// });

// function fillBreedsSelect() {
//     hideError();
//     showLoader();
//   fetchBreeds()
//     .then(response => {
//       const optionsHTML = response.map(breed => {
//         return `<option value="${breed.id}">${breed.name}</option>`;
//       }).join("");
//         breedSelect.innerHTML = optionsHTML;
//         hideLoader();
        
//     })
//     .catch(error => {
//         console.error("Ошибка при получении данных о породах:", error);
//         hideLoader();
//         showError();
        
//     });
// };


// function onBreedSelectChange() {
//     hideError();
//     showLoader();
//   const selectedBreedId = breedSelect.value;
//   fetchCatByBreed(selectedBreedId)
//       .then(response => {
//           displayCatInfo(response);
//           hideLoader();
//       })
//       .catch(error => {
//       console.error("Ошибка при получении данных о коте:", error);
//           catInfoDiv.innerHTML = "";
//           hideLoader();
//           showError();
//       });
// };

// function displayCatInfo(catData) {
//   const catImage = catData[0].url;
//   const catName = catData[0].breeds[0].name;
//   const catDescription = catData[0].breeds[0].description;
//   const catTemperament = catData[0].breeds[0].temperament;

//   const catInfo = `
//     <img src="${catImage}" alt="${catName}">
//     <p><span>Name:</span> ${catName}</p>
//     <p><span>Description:</span> ${catDescription}</p>
//     <p><span>Temperament:</span> ${catTemperament}</p>
//   `;

//   catInfoDiv.innerHTML = catInfo;
// }