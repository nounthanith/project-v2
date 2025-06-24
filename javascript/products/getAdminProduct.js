async function fetchProduct() {
  try {
    const response = await fetch(productUrl + "?action=read");
    const data = await response.json();
    console.log(data);
    const products = data.data;
    const productTable = document.getElementById("productTable");

    if (data.status !== "success") {
      throw new Error("Failed to fetch products");
    }

    let tableRowsHTML = '';
    
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
      
      tableRowsHTML += `
        <tr class="align-middle">
          <th>#${id}</th>
          <td><img src="${imageUrl}" alt="${name}" style="max-width: 45px;"></td>
          <td  class="fw-bold text-uppercase text-truncate truncate-2-lines" style="max-width: 200px;">${name}</td>
          <td><span style="background-color: #fec5bb; padding:2px 15px;" class="text-danger rounded-pill">$${Number(price).toFixed(2)}</span></td>
          <td class="text-danger"><span style="background-color: #fff6cc; padding:2px 15px;" class="rounded-pill">${category}</span></td>
          <td style="color: blue;"><span style="background-color: #a2d2ff; padding:2px 15px;" class="rounded-pill">${stockQty}</span></td>
          <td class="text-dark"><span style="background-color: #d8f3dc; padding:2px 15px;" class="rounded-pill">${rating}⭐</span></td>
          <td>${new Date(createdAt).toLocaleDateString()}</td>
          <td style="white-space: nowrap; flex-wrap: nowrap;" class="">
            <button onclick="deleteProduct(${id})" class="btn btn-sm btn-danger">Delete</button>
            <button class="btn btn-sm btn-warning">Edit</button>
          </td>
        </tr>
      `;
    });

    productTable.innerHTML = tableRowsHTML;

  } catch (error) {
    console.error("Error fetching products:", error);
    productTable.innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-danger">
          Error loading products: ${error.message}
        </td>
      </tr>
    `;
  }
}

fetchProduct();


//Delete User
function deleteProduct(id) {
  var params = {
    action: "delete",
    id: id,
  };

  fetch(productUrl + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        title: "Delete",
        text: "Delete successfully.",
        icon: "success",
        confirmButtonText: "Back",
      });
      fetchProduct();
    });
}