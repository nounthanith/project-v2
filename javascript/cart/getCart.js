async function fetchCart() {
  try {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      window.location.href = "index.html";
      return;
    }

    const response = await fetch(
      `${cartUrl}?action=read&email=${encodeURIComponent(userEmail)}`
    );
    const data = await response.json();

    if (data.status === "success") {
      renderCart(data.data);
    } else {
      throw new Error(data.message || "Failed to fetch cart");
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
  }
}

function renderCart(items) {
  const userEmail = localStorage.getItem("userEmail");
  const cartContent = document.getElementById("cart-content");
  const cartSummary = document.getElementById("cart-summary");
  const itemCount = document.getElementById("item-count");

  // Clear previous content
  cartContent.innerHTML = "";
  cartSummary.style.display = "none";
  itemCount.textContent = "0 items";

  if (!items || items.length === 0) {
    cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet</p>
            </div>
        `;
    return;
  }

  let subtotal = 0;
  let validItemsCount = 0;
  let html = "";

  items.forEach((item) => {
    if (item.email !== userEmail) {
      console.warn(`Skipping item ${item.id} - doesn't belong to current user`);
      return;
    }

    validItemsCount++;
    const price = parseFloat(item.cartProductPrice) || 0;
    const quantity = parseInt(item.quantity) || 1;
    subtotal += price * quantity;

    html += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.cartProductImage}" alt="${item.cartProductName}" class="item-image">
                <div class="item-details">
                    <h3 class="item-name">${item.cartProductName}</h3>
                    <p class="item-description">${item.cartDescription}</p>
                    <div class="item-rating">
                        ${renderStars(item.cartRating)}
                        <span>${parseFloat(item.cartRating).toFixed(1)}</span>
                    </div>
                    <p class="item-price">$${price.toFixed(2)}</p>
                </div>
                <div class="item-actions">
                    <p>Quantity: ${quantity}</p>
                    <button class="remove-btn" onclick="removeItem('${
                      item.id
                    }')">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
  });

  if (validItemsCount === 0) {
    cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet</p>
            </div>
        `;
    return;
  }

  cartContent.innerHTML = html;
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("total").textContent = `$${subtotal.toFixed(2)}`;
  itemCount.textContent = `${validItemsCount} ${
    validItemsCount === 1 ? "item" : "items"
  }`;
  cartSummary.style.display = "block";
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = "";

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i === fullStars && hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }

  return stars;
}

async function removeItem(itemId) {
  try {
    const result = await Swal.fire({
      title: "Remove item?",
      text: "Are you sure you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      const response = await fetch(`${cartUrl}?action=delete&id=${itemId}`, {
        method: "POST",
      });

      const data = await response.json();

      if (data.status === "success") {
        Swal.fire(
          "Removed!",
          "The item has been removed from your cart.",
          "success"
        );
        fetchCart(); // Refresh the cart
      } else {
        throw new Error(data.message || "Failed to remove item");
      }
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
  }
}

// Initialize the cart when page loads
document.addEventListener("DOMContentLoaded", fetchCart);
