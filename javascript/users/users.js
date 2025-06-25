const urlUsers =
  "https://script.google.com/macros/s/AKfycbwUEl3DI0SczSF3YONRhF6ujWJPrk8kwGGphZ8ZrcUZtaCkiFLErhR1b8CmDMW2orZBZA/exec";
const userData = document.getElementById("userData");
async function fetchUsers() {
  const role = localStorage.getItem("userRole");
  if (role == "user") {
    window.location.href = "page404.html";
    return;
  }

  try {
    const response = await fetch(urlUsers + "?action=read");
    const result = await response.json();
    const users = result.data;
    // console.log(users);
    userData.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const row = document.createElement("tr");

      row.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td class="text-truncate truncate-2-lines" style="max-width: 200px;">${
          user[1]
        }</td>
        <td class="text-danger"><a href="tel:${user[2]}">${user[2]}</a></td>
        <td class="text-capitalize fw-semibold" style="color: ${
          user[5] === "admin" ? "red" : "green"
        }">${user[5]}</td>
        <td class="text-primary"><a href="mailto:${user[3]}">${user[3]}</a></td>
        <td class="text-truncate truncate-2-lines" style="max-width: 200px;">${
          new Date(user[6]).toISOString().split("T")[0]
        }</td>
        <td class="d-flex gap-1">
          <button onclick="deleteUser(${
            user[0]
          })" class="btn btn-sm btn-danger">Delete</button>
          <button onclick="showUserById(${
            user[0]
          })" type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editUser">Edit</button>
        </td>
      `;

      userData.appendChild(row);
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}
fetchUsers();
//Delete User
function deleteUser(id) {
  var params = {
    action: "delete",
    id: id,
  };
  // console.log(id)

  fetch(urlUsers + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        title: "Delete",
        text: "Delete successfully.",
        icon: "success",
        confirmButtonText: "Back",
      });
      fetchUsers();
    });
}
//Add User
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    // Date like "01/01/2023, 12:00:00"
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
      name: name,
      phone: phone,
      email: email,
      password: password.toString(),
      role: role.toLowerCase(),
      created_at: created_at,
    };

    // console.log(params.created_at);
    // console.log(name, phone, email, password);

    fetch(urlUsers + "?" + new URLSearchParams(params), { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            position: "top-right",
            icon: "success",
            title: "Create User successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          fetchUsers();
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Register failed",
            text: data.message,
            showConfirmButton: true,
          });
        }
        document.getElementById("userForm").reset();
      });
  });

//Put Data in to update Dialog
const showUserById = (id) => {
  fetch(urlUsers + "?action=read")
    .then((res) => res.json())
    .then((data) => {
      const user = data.data.find((u) => u[0] == id);

      if (user) {
        document.getElementById("editName").value = user[1];
        document.getElementById("editPhone").value = user[2];
        document.getElementById("editEmail").value = user[3];
        document.getElementById("editPassword").value = user[4];
        document.getElementById("editRole").value = user[5];

        document.getElementById("editUserId").value = user[0];

        const editModal = new bootstrap.Modal(
          document.getElementById("editUserModal")
        );
        editModal.show();
      }
    });

  localStorage.setItem("id", id);
};
//Edit Function
function updateUser() {
  const id = localStorage.getItem("id");
  const password = document.getElementById("editPassword").value;
  const name = document.getElementById("editName").value;
  const phone = document.getElementById("editPhone").value;
  const email = document.getElementById("editEmail").value;
  const role = document.getElementById("editRole").value;
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
    action: "update",
    id: id,
    name: name,
    phone: phone,
    email: email,
    password: password,
    role: role,
    created_at: created_at,
  };

  fetch(urlUsers + "?" + new URLSearchParams({ action: "update", id: id }), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const editModal = bootstrap.Modal.getInstance(
          document.getElementById("editUserModal")
        );
        editModal.hide();
        Swal.fire({
          title: "Success",
          text: "User Edit successfully.",
          icon: "success",
        });
        fetchUsers();
      } else {
        alert("Error updating user: " + data.data);
      }
    })
    .catch((error) => {
      console.error("Update error:", error);
      alert("An error occurred while updating the user.");
    });
}
