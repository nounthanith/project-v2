const url =
  "https://script.google.com/macros/s/AKfycbzRgmdkTmJrEUzJXjhnuxyoVF9Vlts0g92wPtwSOK18KhEpyFlMlweH5DRhX2fR9q0-kQ/exec";

document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
      role: "user",
      created_at: created_at,
    };

    // console.log(params.created_at);
    // console.log(name, phone, email, password);

    fetch(url + "?" + new URLSearchParams(params), { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.status === "success") {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Register successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          // Redirect to login page after 3.5 seconds
          setTimeout(() => {
            location.href = "index.html";
          }, 3500);
        }else {
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
