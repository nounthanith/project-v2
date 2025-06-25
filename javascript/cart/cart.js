const productName = localStorage.getItem("productName");
const productImage = localStorage.getItem("productImage");
const productPrice = localStorage.getItem("productPrice");
const Category = localStorage.getItem("Category");
const Description = localStorage.getItem("Description");
const Rating = localStorage.getItem("Rating");
const Email = localStorage.getItem("userEmail");
const Phone = localStorage.getItem("userPhone");

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

const cartUrl =
  "https://script.google.com/macros/s/AKfycbzqUHr-YmfjebKXTWAK6556CJ3hPF4hQnmyCMMx5juOe1OsGLJkkMxme2Ktw21_3Cnx/exec";

let isAddingToCart = false;

async function addToCart() {
  if (isAddingToCart) return;
  isAddingToCart = true;

  try {
    if (!productName || !productPrice) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error",
        text: "Product information is incomplete",
        showConfirmButton: true,
      });
      return;
    }

    const addButton = document.getElementById("addToCartBtn");
    if (addButton) addButton.disabled = true;

    const params = {
      action: "insert",
      id: Math.floor(Math.random() * 100),
      cartProductName: productName,
      cartProductImage: productImage || "no-image.jpg",
      cartProductPrice: productPrice,
      cartDescription: Description || "No description available",
      cartRating: Rating || "0",
      email: Email,
      phone: Phone,
      created_at: created_at,
      quantity: 1,
    };

    const response = await fetch(cartUrl + "?" + new URLSearchParams(params), {
      method: "POST",
      redirect: "follow",
    });

    const data = await response.json();

    if (data.status === "success") {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Added to Cart!",
        text: `${productName} has been added to your cart`,
        showConfirmButton: false,
        timer: 2000,
      });

      updateCartCount();

      setTimeout(() => {
        location.href = "cart.html";
      }, 2000);
    } else {
      throw new Error(data.message || "Failed to add to cart");
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Error",
      text: error.message,
      showConfirmButton: true,
    });
  } finally {
    isAddingToCart = false;
    const addButton = document.getElementById("addToCartBtn");
    if (addButton) addButton.disabled = false;
  }
}

function initializeCartButton() {
  const addButton = document.getElementById("addToCartBtn");
  if (addButton) {
    addButton.removeEventListener("click", addToCart);
    addButton.addEventListener("click", addToCart);
  }
}

initializeCartButton();

// function generateUniqueId() {
//   // return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
//   Math.floor(Math.random() * 100)
// }

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    const currentCount = parseInt(localStorage.getItem("cartCount") || "0");
    const newCount = currentCount + 1;
    localStorage.setItem("cartCount", newCount.toString());
    cartCount.textContent = newCount;
    cartCount.style.display = "block";
  }
}

document.getElementById("addToCartBtn")?.addEventListener("click", addToCart);
