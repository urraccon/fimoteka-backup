import { renderMoviesList, renderPaginationButtons } from './render.js';
import {
  WATCHED_KEY,
  QUEUE_KEY,
  saveMovieList,
  loadMovieList,
} from './storage.js';

var watchedList = [],
  queueList = [],
  movArray = [],
  watchedActive = true;
var m;

function initializeLibrary() {
  watchedList = loadMovieList(WATCHED_KEY);
  queueList = loadMovieList(QUEUE_KEY);
  setActiveStyles(watchedBtn);
  const clearBtn = document.querySelector('.clear-btn');
  clearBtn.innerText = 'CLEAR WATCHED LIST';
  if (watchedList.length > 0) {
    renderMoviesList(watchedList);
  } else {
    const spanElem = document.querySelector('.error-message');
    spanElem.innerText = 'Oops! Your "watched" library is empty!';
  }
  clearBtn.addEventListener('click', clearBtnClick);
}
function clearBtnClick() {
  if (watchedActive) {
    console.log('clear watched list');
    watchedList = [];
    saveMovieList(WATCHED_KEY, watchedList);
  } else {
    console.log('clear queue list');
    queueList = [];
    saveMovieList(QUEUE_KEY, queueList);
  }
  const moviesDivElem = document.querySelector('.movies-div');
  moviesDivElem.innerHTML = '';
}
function setActiveStyles(element) {
  element.classList.add('active');
}

function removeActiveStyles(element) {
  element.classList.remove('active');
}
function watchedBtnClick() {
  setActiveStyles(watchedBtn);
  removeActiveStyles(queueBtn);
  watchedActive = true;
  const clearBtn = document.querySelector('.clear-btn');
  clearBtn.innerText = 'CLEAR WATCHED LIST';
  const spanElem = document.querySelector('.error-message');
  if (watchedList.length === 0) {
    spanElem.innerText = 'Oops! Your "watched" library is empty!';
    const moviesDivElem = document.querySelector('.movies-div');
    moviesDivElem.innerHTML = '';
    return;
  } else {
    spanElem.innerText = '';
  }
  renderMoviesList(watchedList);
}
function queueBtnClick() {
  setActiveStyles(queueBtn);
  removeActiveStyles(watchedBtn);
  watchedActive = false;
  const clearBtn = document.querySelector('.clear-btn');
  clearBtn.innerText = 'CLEAR QUEUE LIST';
  const spanElem = document.querySelector('.error-message');
  if (queueList.length === 0) {
    spanElem.innerText = 'Oops! Your "queue" library is empty!';
    const moviesDivElem = document.querySelector('.movies-div');
    moviesDivElem.innerHTML = '';
    return;
  } else {
    spanElem.innerText = '';
  }

  renderMoviesList(queueList);
}
document.addEventListener('DOMContentLoaded', initializeLibrary);
const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');

watchedBtn.addEventListener('click', watchedBtnClick);
queueBtn.addEventListener('click', queueBtnClick);

// modal section
const closeModalButton2 = document.getElementById('closeModalBtn2');
const backdrop2 = document.querySelector('.bckdrp');
closeModalButton2.addEventListener('click', function () {
  backdrop2.style.display = 'none';
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    backdrop2.style.display = 'none';
  }
});
backdrop2.addEventListener('click', function (event) {
  if (event.target === backdrop2) {
    backdrop2.style.display = 'none';
  }
});

const watchedBtn2 = document.querySelector('.wbtn2');
const queueBtn2 = document.querySelector('.qbtn2');
watchedBtn2.addEventListener('click', watchedBtnClick2);
queueBtn2.addEventListener('click', queueBtnClick2);

function watchedBtnClick2() {
  if (m.watched) {
    m.watched = false;
    watchedBtn2.innerHTML = 'Add to watched';
    let extractPos = watchedList.findIndex(movie => movie.id === m.id);
    watchedList.splice(extractPos, 1);
  } else {
    watchedBtn2.innerHTML = 'Remove from watched';
    m.watched = true;
    watchedList.push(m);
  }
  saveMovieList(WATCHED_KEY, watchedList);
  if (watchedActive) {
    renderMoviesList(watchedList);
  } else {
    renderMoviesList(queueList);
  }
}
function queueBtnClick2() {
  if (m.queued) {
    m.queued = false;
    queueBtn2.innerHTML = 'Add to queue';
    let extractPos = queueList.findIndex(movie => movie.id === m.id);
    queueList.splice(extractPos, 1);
  } else {
    queueBtn2.innerHTML = 'Remove from queue';
    m.queued = true;
    queueList.push(m);
  }
  saveMovieList(QUEUE_KEY, queueList);
  if (watchedActive) {
    renderMoviesList(watchedList);
  } else {
    renderMoviesList(queueList);
  }
}
// end of modal section
const btnsDivElem2 = document.querySelector('.movdiv2');
btnsDivElem2.addEventListener('click', showModal2);

function showModal2(event) {
  if (event.target.nodeName !== 'IMG') return;
  if (watchedActive) {
    movArray = watchedList;
  } else {
    movArray = queueList;
  }
  const imgId = event.target.attributes[0].value;
  var pos = movArray.findIndex(movie => imgId - movie.id === 0);
  // fill modal content with movie data
  const titleElem = document.querySelector('.title-film');
  const imgElem = document.querySelector('.movie-poster');
  const voteElem = document.querySelector('.vote');
  const votesElem = document.querySelector('.votes');
  const popularityElem = document.querySelector('.popularity');
  const origTitleElem = document.querySelector('.title');
  const genresElem = document.querySelector('.genres');
  const overviewElem = document.querySelector('.description-text');

  m = movArray[pos];
  titleElem.innerHTML = m.title;
  imgElem.src = m.poster_path;
  voteElem.innerHTML = m.vote_average;
  votesElem.innerHTML = ' / ' + m.vote_count;
  popularityElem.innerHTML = m.popularity;
  origTitleElem.innerHTML = m.original_title;
  genresElem.innerHTML = m.genres;
  overviewElem.innerHTML = m.overview;

  if (m.watched) {
    watchedBtn2.innerHTML = 'Remove from watched';
  } else {
    watchedBtn2.innerHTML = 'Add to watched';
  }
  if (m.queued) {
    queueBtn2.innerHTML = 'Remove from queue';
  } else {
    queueBtn2.innerHTML = 'Add to queue';
  }

  // show modal window
  backdrop2.style.display = 'block';
}
