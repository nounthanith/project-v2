document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider-images');
  
  const images = [
    './images/image1.webp',
    './images/image2.webp',
    './images/image3.webp',
    './images/image4.webp',
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