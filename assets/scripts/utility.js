/**
 * Open Book Form
 * Populates form fields with book data when editing
 * or clears form fields when adding a new book entry.
 * @param {Object|null} book - Book object to populate form fields
 * @returns {void}
 */
function openBookForm(book = null, title = null) {
  const formCover = document.getElementById("book-cover");
  const formId = document.getElementById("book-id");
  const formTitle = document.getElementById("book-title");
  const formAuthor = document.getElementById("book-author");
  const formGenre = document.getElementById("book-genre");
  const formProgress = document.getElementById("book-progress");
  const formStatus = document.getElementById("book-status");
  const formRating = document.getElementById("book-rating");
  const deleteBook = document.getElementById("delete-book");
  const bookFormSection = document.getElementById("book-form");
  const bookList = document.getElementById("book-list");

  if (book) {
    formCover.value = book.cover;
    formId.value = book.id;
    formTitle.value = book.title;
    formAuthor.value = book.author;
    formGenre.value = book.genre;
    formProgress.value = book.progress;
    formStatus.value = book.status;
    formRating.value = book.rating;
    deleteBook.style.display = "inline-block";
  } else {
    formCover.value = "";
    formId.value = "";
    if (title) {
      formTitle.value = title;
    } else {
      formTitle.value = "";
    }
    formAuthor.value = "";
    formGenre.value = "";
    formProgress.value = "";
    formStatus.value = "Not Read";
    formRating.value = "";
    deleteBook.style.display = "none";
  }

  bookFormSection.classList.add("show");
  bookList.classList.add("hide");
}

/**
 * Sort Books By
 * Sorts the books array by the specified field and order.
 * @param {Array} books - Array of book objects
 * @param {string} field - Field to sort the books by
 * @param {string} order - Order to sort the books by
 * @returns {Array} - Sorted array of book objects
 */
function orderBooksArrayBy(books, field, order) {
  return books.sort((a, b) => {
    if (order === "asc") {
      return a[field] > b[field] ? 1 : -1;
    } else {
      return a[field] < b[field] ? 1 : -1;
    }
  });
}

/**
 * Utility function Sanitize Input
 * Prevents XSS attacks by encoding special characters.
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

export { openBookForm, orderBooksArrayBy, sanitizeInput };
