"use strict";

const booksContainer = document.querySelector(".books-container");
const addBook = document.querySelector(".add");
const entireModal = document.querySelector(".bg-modal");
const modalContent = document.querySelector(".modal-content");
const submit = document.querySelector(".submit");
const form = document.querySelector("form");
const closeModal = document.querySelector(".close");
let bookCounter = 0;

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const book = getBookfromInput();
  addBookToLibrary(book);
  entireModal.classList.remove("bg-active");
  console.log(book);
  console.log(myLibrary);
  display(bookCounter);
  bookCounter++;
  form.reset();
});

addBook.addEventListener("click", () => {
  entireModal.classList.add("bg-active");
});

closeModal.addEventListener("click", (e) => {
  entireModal.classList.remove("bg-active");
});

function getBookfromInput() {
  const title =
    document.querySelector("#title").value === ""
      ? "Title"
      : document.querySelector("#title").value;
  const author =
    document.querySelector("#author").value === ""
      ? "Author"
      : document.querySelector("#author").value;
  const pages =
    document.querySelector("#pages").value === ""
      ? 0
      : document.querySelector("#pages").value;
  console.log(pages);
  const isRead = document.querySelector("[type='radio']").checked
    ? "Read"
    : "Not Read";

  return new Book(title, author, pages, isRead);
}

const myLibrary = [];

function Book(title = "Unknown", author = "Unknown", pages = 0, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function display(bookCounter) {
  const obj = myLibrary[bookCounter];
  const newCard = document.createElement("div");

  newCard.classList.add("card");
  newCard.innerHTML = ` <div class="card">
  <div class="card__side card__side--back">
    <div class="card__cover">
      <h4 class="card__heading">
        <span class="card__heading-span">Author</span>
      </h4>
    </div>
    <div class="card__details"></div>
  </div>

  <div class="card__side card__side--front">
    <div class="card__theme">
      <div class="card__theme-box">
        <p class="card__title">Title</p>
      </div>
    </div>
  </div>
</div>
`;
  // const titleDisplay = document.createElement("div");
  // titleDisplay.classList.add("title-display");
  // titleDisplay.textContent = obj.title;
  // newCard.appendChild(titleDisplay);
  // // for (const key in obj) {
  // //   const properties = document.createElement("h1");
  // //   properties.textContent = obj[key];
  // //   newCard.appendChild(properties);
  // // }
  booksContainer.appendChild(newCard);
}
