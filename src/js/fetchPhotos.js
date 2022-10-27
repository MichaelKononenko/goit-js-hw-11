import { loadMore } from '../index.js';
import axios from 'axios';

const SEARCH_URL = 'https://pixabay.com/api/';

async function searchPhoto(input, page) {
  const params = {
    key: '30834606-0dc24151179eb34ac466f7732',
    q: input,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  
  }

  loadMore.classList.add('is-hidden');
  const result = await axios(SEARCH_URL, { params });

  return result.data;
}

export { searchPhoto };
