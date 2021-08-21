const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos = [];

//Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  photos.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, { href: photo.links.html, target: '_blank' });

    const img = document.createElement('img');
    setAttributes(img, { src: photo.urls.regular, alt: photo.alt_description });
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
  imageContainer.hidden = false;
  loader.hidden = true;
}

async function getPhotosFromApi() {
  imageContainer.hidden = true;
  loader.hidden = false;
  const response = await fetch(apiUrl);
  photos = await response.json();
  displayPhotos();
}

getPhotosFromApi();
