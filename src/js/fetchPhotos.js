import { loadMore } from '../index.js';
import axios from 'axios';

const SEARCH_URL = 'https://pixabay.com/api/';
const API_KEY = '30834606-0dc24151179eb34ac466f7732';

async function searchPhoto(input, page) {
  loadMore.classList.add('is-hidden');
  const result = await axios(
    SEARCH_URL +
      '?key=' +
      API_KEY +
      '&q=' +
      input +
      '&image_type=photo&orientation=horizontal&safesearch=true&page=' +
      page +
      '&per_page=40'
  );

  return result.data;
}

export { searchPhoto };
