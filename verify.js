// frontend/forgot/verify.js

const form = document.getElementById("verify-form");
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

  const email = localStorage.getItem("resetEmail");
  const otp = document.getElementById("otp").value;
  const newPassword = document.getElementById("new-password").value;

  if (!email) {
    showMessage("Session expired. Please start again.", "error");
    return;
  }

  try {
    const res = await fetch("https://college-backend-production.up.railway.app/api/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      showMessage("✅ Password reset successful!", "success");
      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        window.location.href = "../login/login.html";
      }, 1500);
    } else {
      showMessage(data.message || "❌ Invalid OTP", "error");
    }
  } catch (error) {
    console.error("Reset error:", error);
    showMessage("⚠️ Server error occurred", "error");
  }
});
