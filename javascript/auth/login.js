const url =
  "https://script.google.com/macros/s/AKfycbzRgmdkTmJrEUzJXjhnuxyoVF9Vlts0g92wPtwSOK18KhEpyFlMlweH5DRhX2fR9q0-kQ/exec";

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    // console.log(email, password);
    try {
      const res = await fetch(url + "?action=read");
      const data = await res.json();

      let found = false;

      for (let i = 0; i < data.data.length; i++) {
        const userEmail = data.data[i][3];
        const userPassword = data.data[i][4].toString();
        // console.log(userEmail, userPassword);
        if (email === userEmail && password === userPassword) {
          found = true;

          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Login successfully",
            showConfirmButton: false,
            timer: 2000,
          });

          // Optional: Store user data
          localStorage.setItem("userId", data.data[i][0]);
          localStorage.setItem("userName", data.data[i][1]);
          localStorage.setItem("userRole", data.data[i][5]);
          localStorage.setItem("userCreatedAt", data.data[i][6]);
          localStorage.setItem("userEmail", userEmail);
          localStorage.setItem("userPhone", data.data[i][2]);

         
          if( data.data[i][5] === "admin") {
            setTimeout(() => {
              location.href = "adminDashboard.html";
            }, 2000);
          }

          if( data.data[i][5] === "user") {
            setTimeout(() => {
              location.href = "product.html";
            }, 2000);
          }

          break;
        }
      }

      if (!found) {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Unable to connect. Please try again later.",
      });
    }
  });
