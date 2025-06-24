const productUrl = "https://script.google.com/macros/s/AKfycbzVaSAa2IrOeRTgRsQN2CzvFbbRyO3nZPj-KMG2tiYlHrd0_EkYf-W6fRdAnoJfkA/exec";
let allProducts = [];

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

    allProducts = data.data;
    renderProducts(allProducts);
    createCategoryButtons(allProducts);
  } catch (error) {
    console.error("Fetch error:", error);
    showError();
  }
}

function renderProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="alert alert-info">No products found in this category.</div>
      </div>
    `;
    return;
  }

  products.forEach((product) => {
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
      <div onclick="showProductDetail(${id})" class="col-md-6 col-lg-3 mb-4">
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
          <div class="product-rating mb-2 d-flex justify-content-between align-items-center">
            <div style="font-size:19px;color:#fb8500;">${"★".repeat(Math.floor(rating))}${"☆".repeat(5 - Math.floor(rating))}</div>
            <p style="background-color:#fcbf49;padding:0px 15px;border: solid 1px black !important; box-shadow: 2px 2px black;font-family: 'Press Start 2P', cursive;" class="text-dark">${rating}</p>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", productCard);
  });
  
}

function createCategoryButtons(products) {
  const container = document.getElementById("category-buttons-container");
  if (!container) {
    console.error("Container for category buttons not found");
    return;
  }

  const categories = [...new Set(products.map(p => p[4]))];
  
  container.innerHTML = `
    <button class="category-btn active" data-category="all">
      All Products (${products.length})
    </button>
    ${categories.map(cat => {
      const count = products.filter(p => p[4] === cat).length;
      return `<button class="category-btn" data-category="${cat}">${cat} (${count})</button>`;
    }).join("")}
  `;

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.category-btn').forEach(b => {
        b.classList.remove('active');
      });
      
      this.classList.add('active');
      
      const category = this.dataset.category;
      const filteredProducts = category === "all" 
        ? allProducts 
        : allProducts.filter(p => p[4] === category);
      
      renderProducts(filteredProducts);
    });
  });
}

function showError() {
  const container = document.getElementById("products-container");
  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="alert alert-danger">Failed to load products. Please try again later.</div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', fetchProduct);