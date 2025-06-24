document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider-images');
  
  const images = [
    'https://global-static.popmart.com/globalAdmin/1750043256667____kv_3000x1250____.jpg?x-oss-process=image/format,webp',
    'https://global-static.popmart.com/globalAdmin/1730381557068____1440x600____.jpg?x-oss-process=image/format,webp',
    'https://global-static.popmart.com/globalAdmin/1750646125453____kv_3000x1250_pc_skullpanda-the-paradox-series-figures_blind-boxes-_popmart-us____.jpg?x-oss-process=image/format,webp',
    // 'https://global-static.popmart.com/globalAdmin/1749449415978____kv_3000x1250____.jpg?x-oss-process=image/format,webp'
  ];
  
  images.forEach(imgUrl => {
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'Header image';
    slider.appendChild(img);
  });
  
  const firstImg = slider.firstElementChild.cloneNode(true);
  slider.appendChild(firstImg);
});