const FORM = document.querySelector("#form");

document.getElementById("form").addEventListener("submit", function (event) {
  const username = document.getElementsByName("username")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("password")[0].value;
  const confirmPassword =
    document.getElementsByName("confirm-password")[0].value;

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    event.preventDefault(); // Evitar que el formulario se envíe
    return;
  }

  if (password.length < 6) {
    alert("Password must have at least 6 characters.");
    event.preventDefault();
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    event.preventDefault();
    return;
  }

  // El formulario es válido, ejecuta el script original
  const USERNAME = username;
  const PASSWORD = password;
  const EMAIL = email;

  console.log(
    "Username: " + USERNAME + ", Password: " + PASSWORD + ", Email: " + EMAIL
  );

  window.localStorage.setItem("email", EMAIL);
  window.localStorage.setItem("password", PASSWORD);
  window.localStorage.setItem("username", USERNAME);

  // Redirige al usuario a la página anterior
  alert("Registration successful!");
  window.history.back();
});

function generateStars() {
  const numStars = 400;
  for (let i = 0; i < numStars; i++) {
    let star = document.createElement("div");
    star.className = "star";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    star.style.animationDuration = Math.random() * 6 + "s";
    star.style.animationDelay = "-" + Math.random() * 6 + "s";
    document.body.appendChild(star);
  }
}

window.onload = generateStars;
