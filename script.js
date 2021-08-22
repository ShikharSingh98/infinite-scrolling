const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imgLoaded = 0;
let totalImages = 0;

let photos = [];

//Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  imgLoaded++;
  if (imgLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function displayPhotos() {
  totalImages = photos.length;

  photos.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, { href: photo.links.html, target: '_blank' });

    const img = document.createElement('img');
    setAttributes(img, { src: photo.urls.regular, alt: photo.alt_description });

    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotosFromApi() {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
  } catch (err) {}
}

window.addEventListener('scroll', function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    ready = false;
    imgLoaded = 0;
    getPhotosFromApi();
  }
});

getPhotosFromApi();
