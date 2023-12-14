// Import the functions you need from the SDKs you need
import { getDatabase, ref, onValue, push, set } from "./firebase-setup.js";

function initialize() {
  const COMMENT_FORM = document.querySelector("#comment-form");
  COMMENT_FORM.addEventListener("submit", addMessage);

  showMessages();
  console.log("Initialize ()");
}

function showMessages() {
  const COMMENTS_REF = ref(getDatabase(), "comments/");
  onValue(COMMENTS_REF, showAllMessages);

  console.log("showMessages()");
}
//Problema con esta funcion
function showAllMessages(snapshot) {
  const VALUES = snapshot.val();
  const USERNAME_LOCAL = window.localStorage.getItem("username");
  const SENT_COMMENTS = document.querySelector("#commentary-section");
  SENT_COMMENTS.innerHTML = "";

  for (let value in VALUES) {
    const USERNAME = VALUES[value].name;
    const DATE = VALUES[value].date;
    const COMMENT = VALUES[value].comment;
    const LIKES = VALUES[value].likes;
    const DISLIKES = VALUES[value].dislikes;

    if (USERNAME == USERNAME_LOCAL) {
      SENT_COMMENTS.innerHTML += `
            <div class="users-comments-container container-fluid col-12 col-sm-11 col-md-8">
                    <div class="users-profile">
                      <p class="h1"> ${USERNAME_LOCAL[0].toUpperCase()} </p>
                    </div>
                    <div class="user-info">
                      <p class="h3"> ${USERNAME_LOCAL}</p>
                      <p class="h6"> ${DATE}</p>
                    </div>
                    <div class="user-modifier-container container">
                      <i class="fa-solid fa-ellipsis-vertical" data-toggle="modal" data-target="#Modal" ></i>
                    </div>
                    <div class="user-comment-container container-fluid">
                      <article>${COMMENT}</article>
                    </div>
                    <div class="user-interaction">
                      <i class="fa-regular fa-thumbs-up"></i>
                      <p class="h6 number-likes"> ${0} </p>
                      <i class="fa-regular fa-thumbs-down"></i>
                      <p class="h6 number-dislikes"> ${0} </p>
                    </div>
                    <div class="remove-comment">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
        `;
    } else {
      SENT_COMMENTS.innerHTML += `
        <div class="users-comments-container container-fluid col-12 col-sm-11 col-md-8">
                <div class="users-profile">
                  <p class="h1"> ${USERNAME[0].toUpperCase()} </p>
                </div>
                <div class="user-info">
                  <p class="h3"> ${USERNAME}</p>
                  <p class="h6"> ${DATE}</p>
                </div>
                <div class="user-comment-container container-fluid">
                  <article>${COMMENT}</article>
                </div>
                <div class="user-interaction">
                  <i class="fa-regular fa-thumbs-up"></i>
                  <p class="h6 number-likes"> ${LIKES} </p>
                  <i class="fa-regular fa-thumbs-down"></i>
                  <p class="h6 number-dislikes"> ${DISLIKES} </p>
                </div>
            </div>
    `;
    }
  }

  const THUMB_UP = document.querySelectorAll(".fa-thumbs-up");
  const THUMB_DOWN = document.querySelectorAll(".fa-thumbs-down");

  const LIKES = document.querySelectorAll(".number-likes");
  const DISLIKES = document.querySelectorAll(".number-dislikes");

  THUMB_UP.forEach(function (element, index) {
    element.addEventListener("click", function () {
      console.log("thumb up nº: " + index + 1);
      LIKES[index].innerHTML++;
    });
  });
  THUMB_DOWN.forEach(function (element, index) {
    element.addEventListener("click", function () {
      console.log("thumb down nº: " + index + 1);
      DISLIKES[index].innerHTML++;
    });
  });

  const REMOVE_COMMENT = document.querySelectorAll(".remove-comment");
  const USER_COMMENT = document.querySelectorAll(".users-comments-container");

  REMOVE_COMMENT.forEach((element, index) => {
    element.addEventListener("click", () => {
      console.log("Comment nº: " + (index + 1));
      let commentArticle = element.closest(".users-comments-container");

      commentArticle.remove();
      removeMessage(index);
    });
  });

  console.log("showAllMessages() ");
}

function addMessage(e) {
  e.preventDefault();

  let datos = new Date();

  let dia = datos.getDay();
  let mes = datos.getMonth();
  let anio = datos.getFullYear();

  switch (mes) {
    case 1:
      mes = "Enero";
      break;
    case 2:
      mes = "Febrero";
      break;
    case 3:
      mes = "Marzo";
      break;
    case 4:
      mes = "Abril";
      break;
    case 5:
      mes = "Mayo";
      break;
    case 6:
      mes = "Junio";
      break;
    case 7:
      mes = "Julio";
      break;
    case 8:
      mes = "Agosto";
      break;
    case 9:
      mes = "Septiembre";
      break;
    case 10:
      mes = "Octubre";
      break;
    case 11:
      mes = "Noviembre";
      break;
    case 12:
      mes = "Diciembre";
      break;
  }

  const USERNAME = window.localStorage.getItem("username");
  const DATE = `${dia}, ${mes}, ${anio}`;
  const COMMENT = e.target.textArea.value;

  const COMMENTS_REF = ref(getDatabase(), "comments/");

  const newComment = {
    name: USERNAME,
    date: DATE,
    comment: COMMENT,
    likes: 0,
    dislikes: 0,
  };

  push(COMMENTS_REF, newComment);

  console.log("addMessage()");
}

function removeMessage(index) {
  const COMMENTS_REF = ref(getDatabase(), "comments/");
  let acumulador;

  onValue(COMMENTS_REF, (snapshot) => {
    const VALUES = snapshot.val();
    for (let key in VALUES) {
      acumulador += ", " + key;
      if (key === index) {
        const COMMENT_VALUE = ref(getDatabase(), "comments/" + key[index]);
        COMMENT_VALUE.remove();
        console.log(
          "comentario eliminado de la base de datos: " + COMMENT_VALUE
        );
      }
    }
  });
  console.log("Comentario eliminado: " + acumulador);
  console.log("Eliminado con exito");
}

initialize();
