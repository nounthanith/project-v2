const showProductDetail = (id) => {
  document.body.innerHTML = `
    <div style="margin-top:300px" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <p class="text-center">Loading...🙏❤️</p>
  `;

  fetch(productUrl + "?action=read")
    .then((res) => res.json())
    .then((data) => {
      location.href = "productDetail.html";
      const product = data.data.find((u) => u[0] == id);
      localStorage.setItem("productName", product[1]);
      localStorage.setItem("productImage", product[2]);
      localStorage.setItem("productPrice", product[3]);
      localStorage.setItem("Category", product[4]);
      localStorage.setItem("Description", product[5]);
      localStorage.setItem("Stock", product[6]);
      localStorage.setItem("Rating", product[7]);

      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
