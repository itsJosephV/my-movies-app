const headerTitle = document.getElementById("header-h1");
const headerButtonWl = document.querySelector("#watchlist-header p");
const searchForm = document.querySelector("#search-form");
const searchTitle = document.querySelector("#title-field");
const searchButton = document.querySelector("#search-btn");

const filmList = document.querySelector("#film-list");
const emptyStateContainer = document.querySelector("#empty-state-container");

// SVG MANIPULATION
const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgIcon.setAttribute("stroke", "currentColor");
svgIcon.setAttribute("fill", "currentColor");
svgIcon.setAttribute("stroke-width", "0");
svgIcon.setAttribute("viewBox", "0 0 24 24");
svgIcon.setAttribute("height", "5em");
svgIcon.setAttribute("width", "5em");

const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
svgPath.setAttribute(
  "d",
  "M18 4l2 3h-3l-2-3h-2l2 3h-3l-2-3H8l2 3H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-6.75 11.25L10 18l-1.25-2.75L6 14l2.75-1.25L10 10l1.25 2.75L14 14l-2.75 1.25zm5.69-3.31L16 14l-.94-2.06L13 11l2.06-.94L16 8l.94 2.06L19 11l-2.06.94z"
);

svgIcon.appendChild(svgPath);

const emptyText = document.createElement("p");
emptyText.textContent = "Start exploring";

// PLACE SVG AND TEXT INSIDE emptyStateContainer
emptyStateContainer.appendChild(svgIcon);
emptyStateContainer.appendChild(emptyText);

const filmItemContainer = document.querySelector("#film-item-container");
console.log(filmItemContainer);

const key = import.meta.env.VITE_MOVIES_APIKEY
// DATA FETCH
async function dataFetch(movie) {
  fetch(`https://www.omdbapi.com/?apikey=${key}&s=${movie}&type=movie`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al hacer fetch");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

dataFetch('dunkirk')


searchTitle.addEventListener('input', e => {
  console.log('Input value', e.target.value)
})



