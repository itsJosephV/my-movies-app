let myMovies = [];

const watchListContainer = document.querySelector("#watch-film-list");
const localStorageWl = JSON.parse(localStorage.getItem("watchlist"));

// console.log(localStorageWl)

if (localStorageWl && localStorageWl.length > 0) {
  myMovies.push(...localStorageWl);
  renderWatchList(myMovies);
  // alert('localStarge not empty')
} else {
  renderNoMoviesFound();
}

// console.log(myMovies)

function renderWatchList(watchListArr) {
  watchListContainer.innerHTML = "";
  watchListArr.forEach((film) => {
    watchListContainer.innerHTML += `
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
                  <button id="film-watchlist" data-delete-movie=${film.imdbID}>delete</button>
                </div>
    
                <div id="film-plot">
                  <p id="film-text">${film.Plot}</p>
                </div>
              </article>
            </div>
            <hr>
        </div>
      `;
  });
}

function renderNoMoviesFound() {
  watchListContainer.innerHTML = `
      <div id="no-results-msg">
        <p id="no-results-msg-p">There are no movies saved.</p>
        <p id="no-results-msg-p">Start searching.</p>
      </div>
    `;
}

function renderDeletedAlert() {
  const alertContainer = document.querySelector("#watchlist-alert-container");

  if (!alertContainer) {
    const container = document.querySelector("#container");
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div id="watchlist-alert-container">
        <div id="watchlist-alert">
          <p>Film deleted</p>
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

function handleDeleteMovie(filmId) {
  const targetFilm = localStorageWl.find((item) => {
    return item.imdbID === filmId;
  });
  localStorageWl.splice(localStorageWl.indexOf(targetFilm), 1);
  localStorage.setItem("watchlist", JSON.stringify(localStorageWl));

  renderDeletedAlert();

  if (localStorageWl.length === 0) {
    renderNoMoviesFound();
  } else {
    renderWatchList(localStorageWl);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.dataset.deleteMovie) {
    handleDeleteMovie(e.target.dataset.deleteMovie);
  }
});

// function handleDeleteMovie(filmId) {
//   console.log("Deleting movie with ID:", filmId);

//   const targetFilm = myMovies.find((item) => {
//     return item.imdbID === filmId;
//   });

//   console.log("Target Film:", targetFilm);

//   if (targetFilm) {
//     const targetIndex = myMovies.indexOf(targetFilm);
//     if (targetIndex !== -1) {
//       myMovies.splice(targetIndex, 1);
//       console.log("Updated myMovies Array:", myMovies);
//       localStorage.setItem("watchlist", JSON.stringify(myMovies));
//       renderDeletedAlert();
//       renderWatchList(myMovies);
//     }
//   }
// }
