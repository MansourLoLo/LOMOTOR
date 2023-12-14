let comments = [
  {
    comment:
      "I recently acquired a Porsche 911 Carrera and am absolutely in love with its performance and sleek design! Does anyone else here have experience with this iconic model?",
    date: "23 february 2023",
    dislikes: 20,
    likes: 0,
    name: "John Doe",
  },
  {
    comment:
      "I'm thinking of tuning my Ford Mustang to give it a more personalized touch. Any tips on performance improvements or styles that really stand out? I'm excited to hear your suggestions! ",
    date: "16 may 2009",
    dislikes: 2,
    likes: 5,
    name: "Emily Davis",
  },
  {
    comment:
      "Does anyone else keep a close eye on the latest developments in electric cars? Technology is advancing rapidly, and I'm eager to hear opinions on models like the Tesla Model 3 and Nissan Leaf. Which one do you think will lead the way in the future of electric vehicles? ",
    date: "09 september 2020",
    dislikes: 1,
    likes: 8,
    name: "Alex Johnson",
  },
];

function initialize() {
  const COMMENT_FORM = document.querySelector("#comment-form");
  COMMENT_FORM.addEventListener("submit", addMessage);

  showAllMessages();
}

function showAllMessages() {
  const USERNAME_LOCAL = window.localStorage.getItem("username");
  const SENT_COMMENTS = document.querySelector("#commentary-section");

  let comments_local = window.localStorage.getItem("comments");
  let comments_stringified = JSON.parse(comments_local);

  for (let comment in comments_stringified) {
    const USERNAME = comments_stringified[comment].name;
    const DATE = comments_stringified[comment].date;
    const COMMENT = comments_stringified[comment].comment;
    const LIKES = comments_stringified[comment].likes;
    const DISLIKES = comments_stringified[comment].dislikes;

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
                          <div id="user-modifier-container" class="container">
                            <i class="fa-solid fa-ellipsis-vertical" data-toggle="modal" data-target="#Modal" ></i>
                          </div>
                          <div class="user-comment-container container-fluid">
                            <textarea readonly class="content-comment" >${COMMENT}</textarea >
                          </div>
                          <div class="user-interaction">
                            <i class="fa-regular fa-thumbs-up"></i>
                            <p class="h6 number-likes"> ${LIKES} </p>
                            <i class="fa-regular fa-thumbs-down"></i>
                            <p class="h6 number-dislikes"> ${DISLIKES} </p>
                            <div class="edit-comment">
                            <button style="display: none" class="btn-edit-cancel"> Cancel </button>
                            <button style="display: none" class="btn-edit"> Save </button>
                            <i class="edit-icon fa-solid fa-pen-to-square"></i>
                          </div>
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

    const THUMB_UP = document.querySelectorAll(".fa-thumbs-up");
    const THUMB_DOWN = document.querySelectorAll(".fa-thumbs-down");

    const LIKES_COMMENT = document.querySelectorAll(".number-likes");
    const DISLIKES_COMMENT = document.querySelectorAll(".number-dislikes");

    THUMB_UP.forEach(function (element, index) {
      element.addEventListener("click", () => {
        console.log("thumb up nº: " + index);

        comments_stringified[index].likes++;

        window.localStorage.setItem(
          "comments",
          JSON.stringify(comments_stringified)
        );

        LIKES_COMMENT[index].innerHTML = parseInt(
          comments_stringified[index].likes
        );
      });
    });
    THUMB_DOWN.forEach(function (element, index) {
      element.addEventListener("click", () => {
        console.log("thumb down nº: " + index + 1);
        DISLIKES_COMMENT[index].innerHTML++;

        comments_stringified[index].dislikes++;

        window.localStorage.setItem(
          "comments",
          JSON.stringify(comments_stringified)
        );

        DISLIKES_COMMENT[index].innerHTML = parseInt(
          comments_stringified[index].dislikes
        );
      });
    });
  }

  editComment();
  removeComent();
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

  const newComment = {
    name: USERNAME,
    date: DATE,
    comment: COMMENT,
    likes: 0,
    dislikes: 0,
  };

  comments.push(newComment);

  window.localStorage.setItem("comments", JSON.stringify(comments));

  showAllMessages();
  console.log(comments);
}

function removeComent() {
  const REMOVE_COMMENT = document.querySelectorAll(".remove-comment");
  const USER_COMMENT = document.querySelectorAll(".users-comments-container");

  REMOVE_COMMENT.forEach((element, index) => {
    element.addEventListener("click", () => {
      console.log("Comment deleted nº: " + (index + 4));
      let commentArticle = element.closest(".users-comments-container");

      let comments_local = window.localStorage.getItem("comments");
      let comments_stringified = JSON.parse(comments_local);

      comments_stringified.splice(index + 3);

      window.localStorage.setItem(
        "comments",
        JSON.stringify(comments_stringified)
      );

      console.log(comments_stringified);

      commentArticle.remove();
    });
  });
}

function editComment() {
  const BTN_EDIT = document.querySelectorAll(".btn-edit");
  const BTN_EDIT_CANCEL = document.querySelectorAll(".btn-edit-cancel");
  const EDIT_ICON = document.querySelectorAll(".edit-icon");
  const CONTENT_COMENT = document.querySelectorAll(".content-comment");

  EDIT_ICON.forEach((element, index) => {
    element.addEventListener("click", () => {
      console.log("edit btn: " + index);
      CONTENT_COMENT[index].readOnly = false;

      EDIT_ICON[index].style.display = "none";
      BTN_EDIT[index].style.display = "block";
      BTN_EDIT_CANCEL[index].style.display = "block";
    });
  });
  BTN_EDIT_CANCEL.forEach((element, index) => {
    element.addEventListener("click", () => {
      CONTENT_COMENT[index].readOnly = true;

      let comments_local = window.localStorage.getItem("comments");
      let comments_stringified = JSON.parse(comments_local);

      EDIT_ICON[index].style.display = "block";
      BTN_EDIT[index].style.display = "none";
      BTN_EDIT_CANCEL[index].style.display = "none";

      CONTENT_COMENT.innerHTML = comments_stringified[index + 3].comment;
      showAllMessages();
    });
  });
  BTN_EDIT.forEach((element, index) => {
    element.addEventListener("click", () => {
      EDIT_ICON[index].style.display = "block";
      BTN_EDIT[index].style.display = "none";
      BTN_EDIT_CANCEL[index].style.display = "none";

      let comments_local = window.localStorage.getItem("comments");
      let comments_stringified = JSON.parse(comments_local);

      comments_stringified[index + 3].comment = CONTENT_COMENT[index].value;
      window.localStorage.setItem(
        "comments",
        JSON.stringify(comments_stringified)
      );
    });
  });
}

initialize();