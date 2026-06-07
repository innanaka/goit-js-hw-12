import { getImagesByQuery } from './js/pixabay-api.js';
import * as render from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  
  query = event.currentTarget.elements.searchQuery.value.trim();
  
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  page = 1;
  
  render.clearGallery();
  render.hideLoadMoreButton();
  render.showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({ message: 'Sorry, there are no images matching your search query. Please try again!' });
      render.hideLoader(); 
      return;
    }

    render.createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page >= totalPages) {
      render.hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      render.showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({ message: 'An error occurred while fetching images.' });
  } finally {
    render.hideLoader();
  }
}

async function onLoadMore() {
  page += 1;
  
  render.hideLoadMoreButton();
  render.showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    
    render.createGallery(data.hits);
    
    setTimeout(() => {
      const galleryItem = document.querySelector('.gallery-item');
      if (galleryItem) {
        const { height: cardHeight } = galleryItem.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }, 100);

    const totalPages = Math.ceil(data.totalHits / perPage);
    
    if (page >= totalPages) {
      render.hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      render.showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({ message: 'Failed to load more images.' });
  } finally {
    render.hideLoader();
  }
}
