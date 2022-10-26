import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { searchPhoto } from './js/fetchPhotos.js';
import { renderData } from './js/renderData.js';
import { keyHandl } from './js/keyboardHandling.js';

const input = document.querySelector('input');
const submit = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;
// let searchText = '';

keyHandl(input);

submit.addEventListener('click', event => {
  event.preventDefault();
  if (!input.value) {
    return;
  }
  if (input.value != searchText) {
    gallery.innerHTML = '';
    page = 1;
  }
  fetchPhoto();
});

loadMore.addEventListener('click', fetchPhoto);

function fetchPhoto() {
  if (!input.value) {
    return;
  }
  const toFind = input.value.trim().toLowerCase();
  searchPhoto(toFind, page)
    .then(data => dataHandling(data))
    .catch(error => {
      console.log(error);
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    });
}

function dataHandling(data) {
  console.log(page);
  if (!data.hits.length) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  loadMore.classList.remove('is-hidden');

  Notify.success(`Hooray! We found ${data.totalHits} images.`);

  renderData(data);
  page += 1;
}

export { loadMore, gallery, fetchPhoto };
