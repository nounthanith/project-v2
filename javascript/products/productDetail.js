const productDetailName = localStorage.getItem("productName");
        const productDetailImage = localStorage.getItem("productImage");
        const productDetailPrice = localStorage.getItem("productPrice");
        const productDetailCategory = localStorage.getItem("Category");
        const productDetailDescription = localStorage.getItem("Description");
        const productDetailRating = localStorage.getItem("Rating");

        // Display data on the page
        document.getElementById('detailName').textContent = productDetailName;
        document.getElementById('detailImage').src = productDetailImage;
        document.getElementById('detailImage').alt = productDetailName;
        document.getElementById('detailPrice').textContent = '$' + productDetailPrice;
        document.getElementById('detailCategory').textContent = productDetailCategory;
        document.getElementById('detailDescription').textContent = productDetailDescription;
        
        // Create star rating
        const rating = parseFloat(productDetailRating);
        const starsContainer = document.getElementById('detailRating');
        starsContainer.innerHTML = '';
        
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsContainer.innerHTML += '★';
            } 
            else {
                starsContainer.innerHTML += '☆';
            }
        }
        
        starsContainer.innerHTML += ` ${rating.toFixed(1)}`;