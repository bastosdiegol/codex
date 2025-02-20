import {
  getBooksFromFirestore,
  addBookToFirestore,
  updateBookInFirestore,
  removeBookFromFirestore,
  auth,
} from "./firebase.js";

const books = [];

const bookList = document.getElementById("book-list");
const bookFormSection = document.getElementById("book-form");
const bookForm = document.getElementById("book-management-form");
const closeBookForm = document.getElementById("close-form");
const deleteBook = document.getElementById("delete-book");
const bookId = document.getElementById("book-id");

/**
 * Function to check if a user is authenticated
 * Redirects to index.html if user is not authenticated
 * @async
 */
function isUserAuthenticated() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        console.log("User is not authenticated");
        window.location = "index.html";
        reject("User not authenticated");
      }
    });
  });
}

const sw = new URL("./service-worker.js", import.meta.url);
if ("serviceWorker" in navigator) {
  const s = navigator.serviceWorker;
  s.register(sw.href, {
    scope: "/codex/",
  })
    .then(() =>
      console.log(
        "Service Worker Registered for scope:",
        sw.href,
        "with",
        import.meta.url
      )
    )
    .catch((err) => console.error("Service Worker Error:", err));
}

document.addEventListener("DOMContentLoaded", async () => {
  await isUserAuthenticated();

  // Load Books for the first time
  await getBooksFromFirestore(books);

  /**
   * Display Books
   * Renders each book as Articles inside Book-List Section.
   * @returns {void}
   */
  function displayBooks() {
    bookList.innerHTML = "";

    books.forEach((book) => {
      // Book Article
      const bookCard = document.createElement("article");
      bookCard.id = book.id;
      bookCard.classList.add("book-card");
      bookCard.setAttribute("aria-labelledby", `book-title-${book.id}`);
      bookCard.tabIndex = 0;

      // Book image container
      if (book.cover !== "") {
        const bookImgDiv = document.createElement("div");
        bookImgDiv.classList.add("book-img");
        const bookImg = document.createElement("img");
        bookImg.src = book.cover;
        bookImg.alt = `${book.title} Book Cover`;
        bookImgDiv.appendChild(bookImg);
        bookCard.appendChild(bookImgDiv);
      }

      // Book info container
      const bookInfoDiv = document.createElement("div");
      bookInfoDiv.classList.add("book-info");
      const bookTitle = document.createElement("h2");
      bookTitle.id = `book-title-${book.id}`;
      bookTitle.textContent = book.title;
      const bookAuthor = document.createElement("p");
      bookAuthor.innerHTML = `<strong>Author:</strong> ${book.author}`;
      const bookGenre = document.createElement("p");
      bookGenre.innerHTML = `<strong>Genre:</strong> ${book.genre.join(", ")}`;
      const bookStatus = document.createElement("p");
      bookStatus.innerHTML = `<strong>Status:</strong> ${book.status}`;
      const bookProgress = document.createElement("p");
      bookProgress.innerHTML = `<strong>Progress:</strong> ${book.progress}%`;
      const bookRatingSpan = document.createElement("span");
      bookRatingSpan.classList.add("book-rating");
      bookRatingSpan.setAttribute(
        "aria-label",
        `Rating: ${book.rating} out of 5 stars`
      );
      bookRatingSpan.innerHTML = renderStars(book.rating);

      // Append all info elements
      bookInfoDiv.appendChild(bookTitle);
      bookInfoDiv.appendChild(bookAuthor);
      bookInfoDiv.appendChild(bookGenre);
      bookInfoDiv.appendChild(bookStatus);
      bookInfoDiv.appendChild(bookProgress);
      // Append info to article
      bookCard.appendChild(bookInfoDiv);
      bookCard.appendChild(bookRatingSpan);

      // Append Article to Book List
      bookList.appendChild(bookCard);
    });
  }

  /**
   * Utility Function that creates a string of stars based on the rating value.
   * @param {number} rating - Rating value from 1 to 5
   * @returns {string} - String of stars
   */
  function renderStars(rating) {
    return "&starf;".repeat(rating) + "&star;".repeat(5 - rating);
  }

  // Keyboard Navigation Functionality
  let currentFocus = null;

  // Focus on the currently focused book card
  function focusOnBookCard(card) {
    if (card) {
      card.classList.add("highlight");
      card.focus();
      card.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => card.classList.remove("highlight"), 1000);
    }
  }

  // Keyboard navigation using arrow keys for book cards
  bookList.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (currentFocus === null) {
        currentFocus = bookList.querySelector(".book-card");
      } else {
        const nextCard = currentFocus.nextElementSibling;
        if (nextCard && nextCard.classList.contains("book-card")) {
          currentFocus = nextCard;
        }
      }
      focusOnBookCard(currentFocus);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (currentFocus === null) {
        currentFocus = bookList.querySelector(".book-card");
      } else {
        const prevCard = currentFocus.previousElementSibling;
        if (prevCard && prevCard.classList.contains("book-card")) {
          currentFocus = prevCard;
        }
      }
      focusOnBookCard(currentFocus);
    } else if (event.key === "Enter" || event.key === " ") {
      // Trigger opening the form for the focused book card
      event.preventDefault();
      if (currentFocus) {
        const bookId = currentFocus.id;
        const book = books.find((b) => b.id == bookId);
        openBookForm(book);
      }
    }
  });

  // Keyboard navigation using tab keys focus
  bookList.addEventListener("focusin", (event) => {
    if (event.target && event.target.classList.contains("book-card")) {
      currentFocus = event.target;
    }
  });

  // Book Form Functionality
  bookList.addEventListener("click", (event) => {
    const bookCard = event.target.closest(".book-card");
    if (bookCard) {
      const bookId = bookCard.id;
      const book = books.find((b) => b.id == bookId);
      openBookForm(book);
    }
  });

  // Save Book Button Functionality
  bookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const cover = sanitizeInput(
      document.getElementById("book-cover").value.trim()
    );
    const title = sanitizeInput(
      document.getElementById("book-title").value.trim()
    );
    const author = sanitizeInput(
      document.getElementById("book-author").value.trim()
    );
    const genre = document
      .getElementById("book-genre")
      .value.split(",")
      .map((item) => sanitizeInput(item.trim()));
    const progress = sanitizeInput(
      document.getElementById("book-progress").value.trim()
    );
    const status = sanitizeInput(
      document.getElementById("book-status").value.trim()
    );
    const rating = sanitizeInput(
      document.getElementById("book-rating").value.trim()
    );

    let savedBook;

    if (bookId.value !== "") {
      const bookIndex = books.findIndex((book) => book.id == bookId.value);
      if (bookIndex !== -1) {
        books[bookIndex] = {
          id: bookId.value,
          cover: cover,
          title: title,
          author: author,
          genre: genre,
          progress: progress,
          status: status,
          rating: rating,
        };

        try {
          await updateBookInFirestore(books[bookIndex]);
        } catch (error) {
          console.error("Error updating book in Firestore: ", error);
        }

        savedBook = books[bookIndex];
      }
    } else {
      const newBook = {
        cover: cover,
        title: title,
        author: author,
        genre: genre,
        progress: progress,
        status: status,
        rating: rating,
      };
      books.push(newBook);
      try {
        books[books.length - 1].id = await addBookToFirestore(newBook);
      } catch (error) {
        console.error("Error adding book to Firestore: ", error);
      }
      savedBook = newBook;
    }

    displayBooks();
    bookFormSection.classList.remove("show");
    bookList.classList.remove("hide");

    const savedBookCard = document.getElementById(savedBook.id);

    if (savedBookCard) {
      savedBookCard.classList.add("highlight");
      savedBookCard.focus();
      savedBookCard.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => savedBookCard.classList.remove("highlight"), 1500);
    }
  });

  // Close Form Button Functionality
  closeBookForm.addEventListener("click", () => {
    bookFormSection.classList.remove("show");
    bookList.classList.remove("hide");
  });

  // Delete Book Button Functionality
  deleteBook.addEventListener("click", function () {
    if (bookId.value === "") return;
    if (
      confirm(
        `Are you sure you want to delete the book "${
          document.getElementById("book-title").value
        }" entry?`
      )
    ) {
      const bookIndex = books.findIndex((book) => book.id == bookId.value);
      if (bookIndex !== -1) {
        try {
          removeBookFromFirestore(bookId.value);
        } catch (error) {
          console.error("Error removing book from Firestore: ", error);
        }
        books.splice(bookIndex, 1);
      }
      displayBooks();
      bookFormSection.classList.remove("show");
      bookList.classList.remove("hide");
    }
  });

  // First Display of Books on Page Load
  displayBooks();
});

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

export { openBookForm, sanitizeInput };
