document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
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

document.addEventListener("DOMContentLoaded", function () {
  const parallaxElements = document.querySelectorAll(".title");

  window.addEventListener("scroll", function () {
    parallaxElements.forEach(function (element) {
      const translateY = window.scrollY * 0.5;
      element.style.transform = `translateY(${translateY}px)`;
    });
  });
});

const IMG_NEWS = document.querySelectorAll(".img-new");

IMG_NEWS.forEach((element, index) => {
  element.addEventListener("click", () => {
    IMG_NEWS[index].style.transform.scale = 4;
  });
});

const USER_LOGIN = document.querySelector("#user-login");

USER_LOGIN.addEventListener("click", () => {
  window.location.href = "login-form.html";
});

const LOAD_MORE = document.querySelector(".load-more");

const loadMoreButton = document.getElementById("btn-load-more");
const iconicElements = document.querySelectorAll(".iconic");
let elementsToShow = 4;

for (let i = 0; i < elementsToShow; i++) {
  iconicElements[i].style.display = "block";
}

loadMoreButton.addEventListener("click", function () {
  for (let i = elementsToShow; i < elementsToShow + 2; i++) {
    if (iconicElements[i]) {
      iconicElements[i].style.display = "block";
    }
  }
  elementsToShow += 2;
});
