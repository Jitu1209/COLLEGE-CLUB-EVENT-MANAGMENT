// frontend/forgot/forgot.js

const form = document.getElementById("forgot-form");
const messageBox = document.getElementById("status-message");

function showMessage(msg, type = 'success') {
  messageBox.textContent = msg;
  messageBox.className = type;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
    messageBox.className = "";
  }, 3000);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("resetEmail", email);
      showMessage("OTP sent to your email", "success");

      setTimeout(() => {
        window.location.href = "verify.html";
      }, 1500);
    } else {
      showMessage(data.message || "Failed to send OTP", "error");
    }
  } catch (error) {
    console.error(error);
    showMessage("Server error occurred", "error");
  }
});
