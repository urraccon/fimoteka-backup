import axios from 'axios';
const TMDB_URL = `https://api.themoviedb.org/3/`,
  API_KEY = `cfa02d8137a4395c6860edb4676198c3`,
  PART1 = 'include_adult=false',
  PART2 = 'language=en-US';

async function fetchMovieGenres() {
  try {
    const response = await axios.get(
      `${TMDB_URL}/genre/movie/list?api_key=${API_KEY}&${PART2}`
    );
    return response.data;
  } catch (error) {
    console.error(`Oops! Something went wrong! Error:` + error);
    const spanElem = document.querySelector('.error-message');
    spanElem.innerHTML = 'Oops! Something went wrong!';
    window.scrollTo(0, 0);
  }
}

async function fetchTrendingMovies(pageNo) {
  try {
    const response = await axios.get(
      `${TMDB_URL}/trending/movie/day?api_key=${API_KEY}&${PART1}&${PART2}&page=${pageNo}`
    );
    return response.data;
  } catch (error) {
    console.error(`Oops! Something went wrong! Error:` + error);
    const spanElem = document.querySelector('.error-message');
    spanElem.innerHTML = 'Oops! Something went wrong!';
    const moviesDivElem = document.querySelector('.movies-div');
    moviesDivElem.innerHTML = '';
    const btnsDivElem = document.querySelector('.buttons-div');
    if (btnsDivElem !== null) btnsDivElem.remove();
    window.scrollTo(0, 0);
  }
}

async function fetchSearchedMovies(searchQuery, pageNo) {
  try {
    const response = await axios.get(
      `${TMDB_URL}/search/movie?query=${searchQuery}&api_key=${API_KEY}&${PART1}&${PART2}&page=${pageNo}`
    );
    return response.data;
  } catch (error) {
    console.error(`Oops! Something went wrong! Error:` + error);
    const spanElem = document.querySelector('.error-message');
    spanElem.innerHTML = 'Oops! Something went wrong!';
    window.scrollTo(0, 0);
  }
}

export { fetchMovieGenres, fetchTrendingMovies, fetchSearchedMovies };
