import axios from 'axios';

const API_KEY = '56116338-e065c09dde8a76b57de900d0e';


export async function getImagesByQuery(query, page) {
  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,       
    per_page: 15,     
  };

  
  const response = await axios.get('https://pixabay.com/api/', { params: searchParams });
  return response.data;
}