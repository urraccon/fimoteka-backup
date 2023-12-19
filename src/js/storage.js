const WATCHED_KEY = 'filmoteka-watched',
  QUEUE_KEY = 'filmoteka-queue';

let value = '';

function saveMovieList(key, list) {
  value = '';
  list.map(item => {
    value += JSON.stringify(item) + '*';
  });
  value = value.slice(0, value.length - 1);
  localStorage.setItem(key, value);
}

function loadMovieList(key) {
  var textList,
    movieList = [];
  try {
    value = localStorage.getItem(key);
  } catch (error) {
    console.error(error);
  }
  if (!value) {
    value = '';
  } else {
    //processing the loaded data
    textList = value.split('*');
    textList.forEach(item => {
      movieList.push(JSON.parse(item));
    });
  }
  return movieList;
}

export { WATCHED_KEY, QUEUE_KEY, saveMovieList, loadMovieList };
