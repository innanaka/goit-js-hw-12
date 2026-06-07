const API_KEY = '56116338-e065c09dde8a76b57de900d0e';

export async function getImagesByQuery(query, page) {
  
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  return data;
}
