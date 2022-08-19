"use strict";

const booksContainer = document.querySelector(".books-container");
const addBook = document.querySelector(".add");
const entireModal = document.querySelector(".bg-modal");
const modalContent = document.querySelector(".modal-content");
const submit = document.querySelector(".submit");
const form = document.querySelector("form");
const closeModal = document.querySelector(".close");
const readStatus = document.querySelector(".read-status");

let bookCounter = 1;

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const book = getBookfromInput();
  addBookToLibrary(book);
  entireModal.classList.remove("bg-active");
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

  const isRead = document.querySelector("[type='radio']").checked
    ? "Read"
    : "Not Read";

  let dateAdded = new Date().toLocaleDateString();

  return new Book(title, author, pages, isRead, dateAdded);
}

const myLibrary = [
  {
    title: "Harry Potter and the goblet of Fire",
    author: "J. k. Rowling",
    pages: 650,
    read: "Read",
    date: new Date().toLocaleDateString(),
  },
];

function Book(title, author, pages, read, date) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.date = date;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function display(bookCount) {
  const obj = myLibrary[bookCount];

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `
  <div class="card_side card_side--back">
    <div class="card_cover">
      <h1 >
        Details
      </h1>
    </div>
    <div class="card_details">
      <div class="pages">
      <h2>Pages</h2>
        <h3>${obj.pages}</h3>
      </div>
      
      <div class="date-added">
      <h2>Date Added</h2>
      <h3>${obj.date}</h3>
      </div>
      
      <div class="is-read">
      <h2>Status</h2>
        <button class="read-status" type="button">${obj.read}</button>
      </div>
      <div class="remove">
      <h2>Remove</h2>
      <button class="btn-delete" data-index="${bookCounter}">
        <span>Delete</span>
    </button>
      </div>
    </div>
  </div>

  <div class="card_side card_side--front">
    <div class="card_theme">
      
      <h1 class="card_title">${obj.title}</h1>
      <div class="author">
        <h2>By</h2>
        <h1>${obj.author}</h1>
      </div>
    </div>
  </div>
</div>
`;
  const deleteBook = newCard.querySelector(".btn-delete");

  deleteBook.addEventListener("click", () => {
    const index = parseInt(deleteBook.getAttribute("data-index"));
    myLibrary.splice(index, 1);

    booksContainer.removeChild(newCard);
    if (!(bookCounter === 0)) {
      bookCounter--;
    }
  });
  booksContainer.appendChild(newCard);
}

display(0);
