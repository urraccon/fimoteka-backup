function renderMoviesList(list) {
  const markup = list
    .map(({ id, poster_path, title, genres, release_year, vote_average }) => {
      // adaug elemente in markup
      return `<div>
    <img id="${id}" src="${poster_path}" alt="movie poster" loading="lazy" />
            <p class="movie-title">   ${title} </p>
            <p class="movie-short-descr"> ${genres} | ${release_year} | <span>${vote_average}</span></p>
        </div>`;
    })
    .join('');
  const moviesDivElem = document.querySelector('.movies-div');
  moviesDivElem.innerHTML = markup;
}

function renderPaginationButtons(crtPage, totalPages) {
  const btnsDivElem = document.querySelector('.buttons-div');
  if (btnsDivElem !== null) btnsDivElem.remove();

  // pag.crt
  // 1 -> se vad        1,2,3,...,total,rgtarw
  // 2 -> se vad lftarw,1,2,3,4,...,total,rgtarw
  // 3 -> se vad lftarw,1,2,3,4,5,...,total,rgtarw
  // 4 -> se vad lftarw,1,2,3,4,5,6,...,total,rgtarw
  // 5 -> se vad lftarw,1,...,3,4,5,6,7,...,total,rgtarw
  // creez un div cu un nr de butoane
  // cele din extreme sunt cu sageata si sunt vizibile numai in anumite conditii
  // pe pozitia a treia dinspre margini spre centru vor fi butoane cu "..." si ele vizibile numai in anumite conditii
  // al doilea buton de la st spre dr, va fi "1"
  // al doilea buton de la dr spre st va fi totalPages
  if (totalPages === 1) return;
  let leftMarkup = `<div class="buttons-div">
      <button id="lftarwBtn">&larr;</button>
      <button id="oneBtn">1</button>
      <button id="lftdotBtn">...</button>`;
  let rigthMarkup = `
      <button id="rgtdotBtn">...</button>
      <button>${totalPages}</button>
      <button id="rgtarwBtn">&rarr;</button>
    </div>`;
  let minPage, maxPage, crtBtn;

  // midMarkup
  switch (crtPage) {
    case 1:
      minPage = 1;
      maxPage = 3;
      break;
    case 2:
      minPage = 1;
      maxPage = 4;
      break;
    default:
      minPage = crtPage - 2;
      maxPage = crtPage + 2;
  }
  if (maxPage >= totalPages) maxPage = totalPages - 1;
  let midMarkup = '';
  for (let i = minPage; i <= maxPage; i++) {
    if (i === 1) continue;
    midMarkup += `<button>${i}</button>`;
  }
  let markup = leftMarkup + midMarkup + rigthMarkup;

  //insert the markup beforeend of main
  const mainElem = document.querySelector('main');
  mainElem.insertAdjacentHTML('beforeend', markup);

  //select the needed button elements
  const lftarwBtn = document.querySelector('#lftarwBtn');
  const lftdotBtn = document.querySelector('#lftdotBtn');
  const rgtdotBtn = document.querySelector('#rgtdotBtn');
  const rgtarwBtn = document.querySelector('#rgtarwBtn');

  //hide the proper buttons
  if (crtPage >= 1 && crtPage <= 4) {
    lftdotBtn.style.display = 'none';
    crtBtn = crtPage + 2;
  }
  if (crtPage === 1) {
    lftarwBtn.style.display = 'none';
    crtBtn = 2;
  }
  if (crtPage > 4) crtBtn = 6;
  if (totalPages - maxPage < 2) rgtdotBtn.style.display = 'none';
  if (crtPage === totalPages) {
    rgtarwBtn.style.display = 'none';
    crtBtn = 7;
  }

  //adding style to current page button
  const currentBtn = document.querySelector(
    `.buttons-div :nth-child(${crtBtn})`
  );
  currentBtn.classList.add('active');

  lftarwBtn.style.backgroundColor = '#F7F7F7';
  rgtarwBtn.style.backgroundColor = '#F7F7F7';

  // const pagContainer = document.querySelector('.buttons-div');
  // console.log(pagContainer);
  // console.log(currentBtn);
  // console.log(crtBtn);
}

export { renderMoviesList, renderPaginationButtons };
