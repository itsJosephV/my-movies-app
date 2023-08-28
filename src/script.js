const searchForm = document.querySelector("#search-form");
const filmList = document.querySelector("#film-list");

//film-watchlist

const watchListButton = document.querySelector("#film-watchlist");

const filmsfromLocalStorage = JSON.parse(localStorage.getItem("watchlist"));

const key = import.meta.env.VITE_MOVIES_APIKEY;

let resultArr = [];
let watchListArr = [];

function generateMovie(film, list) {
  list.innerHTML += `
      <div id="film-item-container">
          <div id="film-item">
            <div id="film-poster">
              <img src="${film.Poster}" alt="film image">
            </div>
  
            <article id="film-info">
              <div id="film-header">
                <h1 id="film-title">${film.Title}</h1>
              </div>
  
              <div id="film-subheader">
                <p id="film-duration">${film.Runtime}</p>
                <p id="film-genre">${film.Genre}</p>
                <button id="film-watchlist-btn" data-set-movie=${film.imdbID}>add</button>
              </div>
  
              <div id="film-plot">
                <p id="film-text">${film.Plot}</p>
              </div>
            </article>
          </div>
          <hr>
      </div>
  `;
}

// WE OBTAIN THE imdbID from this first Fetch
// Then we pass the function fetchMovies to each result of searchResult variable
async function dataFetch(movie) {
  const URL = `https://www.omdbapi.com/?apikey=${key}&s=${movie}&type=movie`;
  const res = await fetch(URL);
  const data = await res.json();

  let searchResult = data.Search;

  if (searchResult === undefined) {
    renderNoMoviesFound()
  }

  for (const result of searchResult) {
    fetchMovies(result);
  }
}

async function fetchMovies(result) {
  const URL = `https://www.omdbapi.com/?apikey=${key}&i=${result.imdbID}`;
  const res = await fetch(URL);
  const data = await res.json();

  console.log(data);

  let {
    Title,
    Ratings: [{ Value: imdbRating }],
    Runtime,
    Genre,
    Plot,
    Poster,
  } = data;

  Poster = Poster === "N/A" ? "/no-poster.png" : Poster;

  let resultObj = {
    imdbID: result.imdbID,
    Title: Title,
    imdbRating: imdbRating,
    Runtime: Runtime,
    Genre: Genre,
    Plot: Plot,
    Poster: Poster,
  };

  resultArr.push(resultObj);

  filmList.innerHTML = "";

  resultArr.forEach((result) => {
    generateMovie(result, filmList)
  })
}

function renderNoMoviesFound() {
  filmList.innerHTML = `
    <div id="no-results-msg">
      <p id="no-results-msg-p">Unable to find what you're looking for.
      <p id="no-results-msg-p">Please try another search.</p>
    </div>
    `;
}

function renderAddedAlert() {
  const alertContainer = document.querySelector("#watchlist-alert-container");

  if (!alertContainer) {
    const container = document.querySelector("#container");
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div id="watchlist-alert-container">
        <div id="watchlist-alert">
          <p>Film ADDED</p>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M17.004 20L17.003 8h-1-8-1v12H17.004zM13.003 10h2v8h-2V10zM9.003 10h2v8h-2V10zM9.003 4H15.003V6H9.003z"></path><path d="M5.003,20c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V8h2V6h-3h-1V4c0-1.103-0.897-2-2-2h-6c-1.103,0-2,0.897-2,2v2h-1h-3 v2h2V20z M9.003,4h6v2h-6V4z M8.003,8h8h1l0.001,12H7.003V8H8.003z"></path><path d="M9.003 10H11.003V18H9.003zM13.003 10H15.003V18H13.003z"></path></svg>
        </div>
      </div>
    `
    );

    setTimeout(() => {
      const alertContainer = document.querySelector(
        "#watchlist-alert-container"
      );
      if (alertContainer) {
        alertContainer.remove();
      }
    }, 2000);
  }
}

function handleAddFilm(filmID) {
  const targetFilm = resultArr.filter((item) => {
    return item.imdbID === filmID;
  })[0];

  if (filmsfromLocalStorage) {
    watchListArr = filmsfromLocalStorage;
  }

  if (targetFilm !== undefined) {
    watchListArr.push(targetFilm);
  }

  localStorage.setItem("watchlist", JSON.stringify(watchListArr));
  renderAddedAlert()
  // alert("saved");
}

filmList.innerHTML = `
<div id="empty-state-container">
    <svg id="svg-icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M18 4l2 3h-3l-2-3h-2l2 3h-3l-2-3H8l2 3H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-6.75 11.25L10 18l-1.25-2.75L6 14l2.75-1.25L10 10l1.25 2.75L14 14l-2.75 1.25zm5.69-3.31L16 14l-.94-2.06L13 11l2.06-.94L16 8l.94 2.06L19 11l-2.06.94z"></path>
    </svg>
    <p>
      Start exploring
    </p>
</div>
`;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  resultArr.splice(0);

  const titleSearch = document.getElementById("title-field").value;
  dataFetch(titleSearch);
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.setMovie) {
    handleAddFilm(e.target.dataset.setMovie);
  }
});
