async function fetchProduct() {
  try {
    const response = await fetch(productUrl + "?action=read");
    const data = await response.json();
    // console.log(data);
    const products = data.data;
    const productTable = document.getElementById("productTable");

    if (data.status !== "success") {
      throw new Error("Failed to fetch products");
    }

    let tableRowsHTML = "";

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
          <td><span style="background-color: #fec5bb; padding:2px 15px;" class="text-danger rounded-pill">$${Number(
            price
          ).toFixed(2)}</span></td>
          <td class="text-danger"><span style="background-color: #fff6cc; padding:2px 15px;" class="rounded-pill">${category}</span></td>
          <td style="color: blue;"><span style="background-color: #a2d2ff; padding:2px 15px;" class="rounded-pill">${stockQty}</span></td>
          <td class="text-dark"><span style="background-color: #d8f3dc; padding:2px 15px;" class="rounded-pill">${rating}⭐</span></td>
          <td>${new Date(createdAt).toLocaleDateString()}</td>
          <td style="white-space: nowrap; flex-wrap: nowrap;" class="">
            <button onclick="deleteProduct(${id})" class="btn btn-sm btn-danger">Delete</button>
            <button onclick="showProductByID(${id})" type="button" data-bs-toggle="modal" data-bs-target="#productEditDialog" class="btn btn-sm btn-warning">Edit</button>
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

//Edit Product Data Dialog
const searchUrl =
  "https://script.google.com/macros/s/AKfycbwVhhpVvWoaMYP4Ecz8D_EqeRcrKlS_uberQeHTx1VJu2EzOvhgtT2I3e2A8vHXAhKY/exec";
async function showProductByID(id) {
  try {
    fetch(`${searchUrl}?action=search&id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const product = data.data;
        document.getElementById("EditName").value = product.name;
        document.getElementById("EditImage_url").value = product.image_url;
        document.getElementById("EditPrice").value = product.price;
        document.getElementById("EditCategory").value = product.category;
        document.getElementById("EditDescription").value = product.description;
        document.getElementById("EditStock_Qty").value = product.stock_Qty;
        document.getElementById("EditRating").value = product.rating;

        localStorage.setItem("id", id);
        // console.log(id)
      });
  } catch (error) {
    Swal.fire({
      title: "Error",
      icon: "error",
    });
    fetchProduct();
  }
}
//Edit Data

function EditProduct() {
  const id = localStorage.getItem("id");
  const editName = document.getElementById("EditName").value;
  const editImage = document.getElementById("EditImage_url").value;
  const editPrice = document.getElementById("EditPrice").value;
  const editCategory = document.getElementById("EditCategory").value;
  const editDescription = document.getElementById("EditDescription").value;
  const editStock_Qty = document.getElementById("EditStock_Qty").value;
  const editRating = document.getElementById("EditRating").value;

  // console.log("id",id)
  // console.log("editName",editName)
  // console.log("editImage", editImage)

  var params = {
    action: "update",
    id: id,
    name: editName,
    image_url: editImage,
    price: editPrice,
    category: editCategory,
    description: editDescription,
    stock_Qty: editStock_Qty,
    rating: editRating,
  };

  fetch(searchUrl + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        title: "Success",
        text: "Product Update successfully.",
        icon: "success",
      });
      fetchProduct();
      console.log(data);
    });
}
