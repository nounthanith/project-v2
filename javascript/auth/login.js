const url =
  "https://script.google.com/macros/s/AKfycbzRgmdkTmJrEUzJXjhnuxyoVF9Vlts0g92wPtwSOK18KhEpyFlMlweH5DRhX2fR9q0-kQ/exec";

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    // console.log("Email: ",email, "Password:", password)

    try {
      const res = await fetch(url + "?action=read");
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      let found = false;

      for (let i = 0; i < data.data.length; i++) {
        const userEmail = data.data[i][3];
        const userPassword = data.data[i][4].toString();
        
        if (email === userEmail && password === userPassword) {
          found = true;

          localStorage.setItem("userId", data.data[i][0]);
          localStorage.setItem("userName", data.data[i][1]);
          localStorage.setItem("userRole", data.data[i][5]);
          // localStorage.setItem("userCreatedAt", data.data[i][6]);
          localStorage.setItem("userEmail", userEmail);
          localStorage.setItem("userPhone", data.data[i][2]);

        
          await Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Login successful",
            showConfirmButton: false,
            timer: 2000,
          });

          const redirectUrl = data.data[i][5] === "admin" 
            ? "adminDashboard.html" 
            : "product.html";
          
          location.href = redirectUrl;
          
          break;
        }
      }

      if (!found) {
        await Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Invalid email or password",
        });
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    } catch (error) {
      console.error("Login error:", error);
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message.includes("HTTP error") 
          ? "Server error. Please try again later." 
          : "Unable to connect. Please check your network.",
      });
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });