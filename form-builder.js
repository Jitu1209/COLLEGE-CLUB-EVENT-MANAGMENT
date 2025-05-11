document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventName = urlParams.get("event");

  const title = document.getElementById("form-title");
  const eventInput = document.getElementById("event");
  const formSection = document.getElementById("form-container");

  if (eventName) {
    title.textContent = "Register for " + eventName;
    eventInput.value = eventName;
    formSection.style.backgroundImage = `url('images/${eventName}.png')`;
  }

  document.getElementById("event-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rollno = document.getElementById("rollno").value;
    const dept = document.getElementById("department").value;
    const year = document.getElementById("year").value;
    const event = eventInput.value;
    const msg = document.getElementById("message").value;

    document.getElementById("form-container").style.display = "none";
    const review = document.getElementById("review-container");
    review.style.display = "block";
    review.style.backgroundImage = `url('images/${event}.png')`;

    document.getElementById("r-name").textContent = name;
    document.getElementById("r-email").textContent = email;
    document.getElementById("r-rollno").textContent = rollno;
    document.getElementById("r-dept").textContent = dept;
    document.getElementById("r-year").textContent = year;
    document.getElementById("r-event").textContent = event;
    document.getElementById("r-msg").textContent = msg;
  });
});