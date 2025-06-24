const showProductDetail = (id) => {
  fetch(productUrl + "?action=read")
    .then((res) => res.json())
    .then((data) => {
      const product = data.data.find((u) => u[0] == id);
      window.location.href = "productDetail.html";
      localStorage.setItem("productName", product[1]);
      localStorage.setItem("productImage", product[2]);
      localStorage.setItem("productPrice", product[3]);
      localStorage.setItem("Category", product[4]);
      localStorage.setItem("Description", product[5]);
      localStorage.setItem("Rating", product[7]);
    });
};
