import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';

// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const SEARCH_URL = 'https://pixabay.com/api/';
const API_KEY = '30834606-0dc24151179eb34ac466f7732';

const input = document.querySelector('input');
const submit = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;
let searchText = '';

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
  searchPhoto()
    .then(data => dataHandling(data))
    .catch(() => {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    });
}

async function searchPhoto() {
  loadMore.classList.add('is-hidden');
  const result = await fetch(
    SEARCH_URL +
      '?key=' +
      API_KEY +
      '&q=' +
      input.value.trim().toLowerCase() +
      '&image_type=photo&orientation=horizontal&safesearch=true&page=' +
      page +
      '&per_page=40'
  );
  searchText = input.value;
  return result.json();
}

function dataHandling(data) {
  loadMore.classList.remove('is-hidden');

  if (!data.hits.length) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  Notify.success(`Hooray! We found ${data.totalHits} images.`);

  console.log(data);

  renderData(data);
  page += 1;
}

function renderData(data) {
  gallery.innerHTML += data.hits.reduce(
    (result, item) =>
      (result += `<div class="photo-card"><a href="${item.webformatURL}">
    <img class="photo" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${item.likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        ${item.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${item.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${item.downloads}
      </p>
    </div>
  </div></a>`),
    ''
  );
  lightbox.refresh();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
