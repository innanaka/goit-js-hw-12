import axios from 'axios'; // 

const API_KEY = '56116338-e065c09dde8a76b57de900d0e';

export async function getImagesByQuery(query, page) {

  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;

  
  const response = await axios.get(url);
  return response.data;
}
