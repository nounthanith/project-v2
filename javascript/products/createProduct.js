const productUrl = "https://script.google.com/macros/s/AKfycbzVaSAa2IrOeRTgRsQN2CzvFbbRyO3nZPj-KMG2tiYlHrd0_EkYf-W6fRdAnoJfkA/exec";

const productForm =  document.getElementById("productForm")
const role = localStorage.getItem("userRole")

// console.log(role) 
if(role === "user"){
  window.location.href = "page404.html"
}
productForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  const image_url = document.getElementById("image_url").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const stock_Qty = document.getElementById("stock_Qty").value;
  const rating = document.getElementById("rating").value;
  
  //date
  const now = new Date();
  const created_at = now.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const params = {
    action: "insert",
    id: Math.floor(Math.random() * 100),
    name: productName,
    image_url: image_url,
    price: price,
    category: category,
    description: description,
    stock_Qty: stock_Qty,
    rating: rating,
    created_at: created_at,
  };

  fetch(productUrl + "?" + new URLSearchParams(params), { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Product created successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        // You might want to add a function to refresh product list here
        // fetchProducts();
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Product creation failed",
          text: data.message,
          showConfirmButton: true,
        });
      }
      document.getElementById("productForm").reset();
      // Close the modal after submission
      bootstrap.Modal.getInstance(document.getElementById('productDialog')).hide();
    })
    .catch(error => {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error",
        text: error.message,
        showConfirmButton: true,
      });
    });
});