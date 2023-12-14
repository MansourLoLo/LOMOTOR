window.addEventListener("submit", (e) => {
  e.preventDefault();

  interaction();
});

function interaction() {}

const EMAIL = window.localStorage.getItem("email");
const PASSWORD = window.localStorage.getItem("password");
const USERNAME = window.localStorage.getItem("username");

console.log(EMAIL, PASSWORD, USERNAME);

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    const leftImageOffset = -scrollPosition * 0.5;
    const rightImageOffset = scrollPosition * 0.5;

    document.querySelector(
      ".left"
    ).style.transform = `translateX(${leftImageOffset}px)`;
    document.querySelector(
      ".right"
    ).style.transform = `translateX(${rightImageOffset}px)`;
  });
});

function login() {
  const USERNAME_LOCAL = window.localStorage.getItem("username");

  let commentAccess = document.querySelector("#comment-access");
  let loginAcess = document.querySelector("#login-access");
  let btnSubmit = document.querySelector("#btn-submit");

  if (USERNAME_LOCAL == null) {
    commentAccess.style.display = "block";
    loginAcess.style.display = "none";
    btnSubmit.style.display = "none";
  } else {
    commentAccess.style.display = "none";
    btnSubmit.style.display = "block";

    let delay = setTimeout(() => {
      loginAcess.style.display = "none";
    }, 2000);
  }
}
login();
