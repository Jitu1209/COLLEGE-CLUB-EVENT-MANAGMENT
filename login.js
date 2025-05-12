const toggleLink = document.getElementById('toggle-link');
const formTitle = document.getElementById('form-title');
const nameInput = document.getElementById('name');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('auth-form');
const messageBox = document.getElementById('status-message');

let isLogin = true;

function showMessage(msg, type = 'success') {
  messageBox.textContent = "✅ " + msg;
  messageBox.className = type;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
    messageBox.className = "";
  }, 3000);
}

function switchForm(toLogin) {
  isLogin = toLogin;

  if (isLogin) {
    formTitle.innerText = 'Login';
    nameInput.style.display = 'none';
    nameInput.required = false;
    submitBtn.innerText = 'Login';
    toggleLink.innerText = 'Signup here';
  } else {
    formTitle.innerText = 'Signup';
    nameInput.style.display = 'block';
    nameInput.required = true;
    submitBtn.innerText = 'Signup';
    toggleLink.innerText = 'Login here';
  }

  nameInput.value = "";
  document.getElementById('email').value = "";
  document.getElementById('password').value = "";
}

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  switchForm(!isLogin);
});

const forgotLink = document.getElementById('forgot-link');
forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = "../forgot/forgot.html";
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const endpoint = isLogin ? 'login' : 'signup';
  const body = isLogin ? { email, password } : { name, email, password };

  try {
    const res = await fetch(`https://college-backend-production.up.railway.app/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (res.ok) {
      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('statusMessage', 'Login Successful!');
        window.location.href = "../../college-website/main.html";
      } else {
        showMessage("Signup Successful! Please login.", "success");
        switchForm(true);
      }
    } else {
      showMessage(data.message || "Something went wrong", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage("Server error occurred. Try again later.", "error");
  }
});
