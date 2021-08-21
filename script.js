const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;

async function getPhotosFromApi() {
  const response = await fetch(apiUrl);
  const photos = await response.json();
  console.log(photos);
}

getPhotosFromApi();
