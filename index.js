const API_URL = 'https://picsum.photos/v2/list?page=1&limit=5';

let images = [];
let currentIndex = 0;

const mainImage = document.getElementById('main-image');
const thumbnailsContainer = document.querySelector('.thumbnails');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const addToCartButton = document.getElementById('add-to-cart');
const confirmationMessage = document.getElementById('confirmation-message');

async function fetchProductImages() {
  try {
    const response = await fetch(API_URL);
    images = await response.json();
    renderImages();
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function renderImages() {
  if (images.length === 0) return;

  mainImage.src = images[currentIndex].download_url;

  thumbnailsContainer.innerHTML = '';
  images.forEach((image, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = image.download_url;
    thumbnail.alt = `Thumbnail ${index + 1}`;
    thumbnail.addEventListener('click', () => changeMainImage(index));
    thumbnailsContainer.appendChild(thumbnail);
  });
}

function changeMainImage(index) {
  currentIndex = index;
  mainImage.src = images[currentIndex].download_url;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  mainImage.src = images[currentIndex].download_url;
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  mainImage.src = images[currentIndex].download_url;
});

addToCartButton.addEventListener('click', () => {
  confirmationMessage.style.display = 'block';
  setTimeout(() => {
    confirmationMessage.style.display = 'none';
  }, 3000);
});

fetchProductImages();
