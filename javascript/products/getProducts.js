const productUrl =
  "https://script.google.com/macros/s/AKfycbzVaSAa2IrOeRTgRsQN2CzvFbbRyO3nZPj-KMG2tiYlHrd0_EkYf-W6fRdAnoJfkA/exec";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
}

async function fetchProduct() {
  try {
    const response = await fetch(productUrl + "?action=read");
    const data = await response.json();

    if (data.status !== "success") {
      throw new Error("Failed to fetch products");
    }

    const container = document.getElementById("products-container");
    container.innerHTML = "";

    data.data.forEach((product) => {
      const [
        id,
        name,
        imageUrl,
        price,
        category,
        description,
        stockQty,
        rating,
        createdAt,
      ] = product;

      const productCard = `
          <div class="col-md-6 col-lg-3 mb-4">
              <div class="product-card h-100 d-flex flex-column">
                  <div class="product-image-container">
                      <img src="${imageUrl}" 
                          class="product-image" 
                          alt="${name}" 
                          onerror="this.src='https://via.placeholder.com/300?text=Product+Image'">
                  </div>
                  <div class="product-date">${formatDate(createdAt)}</div>
                  <h3 class="product-title">${name}</h3>
                  <div class="product-price mb-2">$${parseFloat(price).toFixed(2)}</div>
                  <div class="product-rating mb-2">${"★".repeat(Math.floor(rating))}${"☆".repeat(5 - Math.floor(rating))}(${rating})</div>
              </div>
          </div>
      `;

      container.insertAdjacentHTML("beforeend", productCard);
    });
  } catch (error) {
    console.error("Fetch error:", error);
    const container = document.getElementById("products-container");
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="alert alert-danger">Failed to load products. Please try again later.</div>
      </div>
    `;
  }
}

fetchProduct();
