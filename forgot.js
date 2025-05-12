// ✅ signup.js (same as login.js because both are handled by toggle)
// No need for separate signup.js if using combined login.js with toggle
// But if needed separately:

const form = document.getElementById('signup-form');
const BASE_URL = "https://college-backend-production.up.railway.app";

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Now login.");
      window.location.href = "../login/index.html";
    } else {
      alert(data.message || "Signup failed.");
    }
  } catch (err) {
    alert("Server error occurred. Try again.");
  }
});


// ✅ reset.js (For resetting password using OTP)
const formReset = document.getElementById('reset-form');

formReset.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const otp = document.getElementById('otp').value;
  const newPassword = document.getElementById('new-password').value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Password reset successful. You can now login.");
      window.location.href = "../login/index.html";
    } else {
      alert(data.message || "Failed to reset password.");
    }
  } catch (error) {
    alert("Server error occurred while resetting password.");
  }
});


// ✅ forgot.js (For sending OTP to email)
const forgotForm = document.getElementById('forgot-form');

forgotForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      alert("OTP sent successfully. Check your mail.");
      window.location.href = "../forgot/reset.html";
    } else {
      alert(data.message || "Failed to send OTP.");
    }
  } catch (err) {
    alert("Server error while sending OTP.");
  }
});
