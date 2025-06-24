document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider-images');
  
  // Replace these with your actual image URLs
  const images = [
    'https://global-static.popmart.com/globalAdmin/1750043256667____kv_3000x1250____.jpg?x-oss-process=image/format,webp',
    'https://global-static.popmart.com/globalAdmin/1730381557068____1440x600____.jpg?x-oss-process=image/format,webp',
    'https://global-static.popmart.com/globalAdmin/1750646125453____kv_3000x1250_pc_skullpanda-the-paradox-series-figures_blind-boxes-_popmart-us____.jpg?x-oss-process=image/format,webp',
    // 'https://global-static.popmart.com/globalAdmin/1743491491066____front-img-pc____.png?x-oss-process=image/format,webp'
  ];
  
  // Create image elements
  images.forEach(imgUrl => {
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'Header image';
    slider.appendChild(img);
  });
  
  // Duplicate first image for seamless looping
  const firstImg = slider.firstElementChild.cloneNode(true);
  slider.appendChild(firstImg);
});