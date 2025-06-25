const cartListUrl = "https://script.google.com/macros/s/AKfycbzqUHr-YmfjebKXTWAK6556CJ3hPF4hQnmyCMMx5juOe1OsGLJkkMxme2Ktw21_3Cnx/exec";

async function cartList() {
    try {
        fetch(`${cartListUrl}?action=read`)
            .then(res => res.json())
            .then((data) => {
                const items = data.data;
                const tableBody = document.getElementById('cartTable');
                
                tableBody.innerHTML = '';
                console.log(items)
                items.forEach(item => {
                    const row = document.createElement('tr');
                    row.className = 'align-middle';
                    
                    const date = new Date(item.created_at);
                    const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
                    
                    row.innerHTML = `
                        <tr class="align-middle">
                            <th>#${item.id}</th>
                            <td><img src="${item.cartProductImage}" alt="${item.cartProductName}" style="max-width: 45px;"></td>
                            <td class="fw-bold text-uppercase text-truncate truncate-2-lines" style="max-width: 200px;">${item.cartProductName}</td>
                            <td><span style="background-color: #fec5bb; padding:2px 15px;" class="text-danger rounded-pill">$${Number(item.cartProductPrice).toFixed(2)}</span></td>
                            <td class="text-primary"><a href="mailto:${item.email}"><span style="background-color: #a2d2ff; padding:2px 15px;" class="rounded-pill">${item.email}</span></a></td>
                            <td class="text-primary"><a href="tel:${item.phone}"><span style="background-color: #fff6cc; padding:2px 15px;" class="rounded-pill">${item.phone}</span></a></td>
                            <td>${formattedDate}</td>
                            <td>
                                <button onclick="deleteCart(${item.id})" class="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>    
                    `;
                    
                    tableBody.appendChild(row);
                });
            })
    } catch (error) {
        console.error('Error fetching cart data:', error);
        const tableBody = document.getElementById('productTable');
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center text-danger">Error loading data. Please try again.</td>
            </tr>
        `;
    }
}

cartList();

function deleteCart(id) {
  var params = {
    action: "delete",
    id: id,
  };
  // console.log(id)

  fetch(cartListUrl + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        title: "Delete",
        text: "Delete successfully.",
        icon: "success",
        confirmButtonText: "Back",
      });
      cartList();
    });
}