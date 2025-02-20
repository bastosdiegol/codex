import {
  getBooksFromFirestore,
  addBookToFirestore,
  updateBookInFirestore,
  removeBookFromFirestore,
  auth,
} from "./firebase.js";
import { openBookForm, orderBooksArrayBy, sanitizeInput } from "./utility.js";
import { closeMenu } from "./menu.js";

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

const books = [];
var order = "asc";

// Load Listeners After DOM Content is Loaded
document.addEventListener("DOMContentLoaded", async () => {
  const bookList = document.getElementById("book-list");
  const bookFormSection = document.getElementById("book-form");
  const bookForm = document.getElementById("book-management-form");
  const closeBookForm = document.getElementById("close-form");
  const deleteBook = document.getElementById("delete-book");
  const bookId = document.getElementById("book-id");

  // Check if user is authenticated
  await isUserAuthenticated();

  // Load Books for the first time
  await getBooksFromFirestore(books);

  // Keyboard Navigation Functionality
  let currentFocus = null;

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

  // Book Form Listener
  bookList.addEventListener("click", (event) => {
    const bookCard = event.target.closest(".book-card");
    if (bookCard) {
      const bookId = bookCard.id;
      const book = books.find((b) => b.id == bookId);
      openBookForm(book);
    }
  });

  // Save Book Button Listener
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

    displayBooks(books);
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

  // Close Form Button Listener
  closeBookForm.addEventListener("click", () => {
    bookFormSection.classList.remove("show");
    bookList.classList.remove("hide");
  });

  // Delete Book Button Listener
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
      displayBooks(books);
      bookFormSection.classList.remove("show");
      bookList.classList.remove("hide");
    }
  });

  // Order by Title Button Listener
  document.getElementById("order-by-title").addEventListener("click", () => {
    // Toggle order
    order = order === "asc" ? "desc" : "asc";
    displayBooks(orderBooksArrayBy(books, "title", order));
    closeMenu();
  });

  // Order By Author Button Listener
  document.getElementById("order-by-author").addEventListener("click", () => {
    // Toggle order
    order = order === "asc" ? "desc" : "asc";
    displayBooks(orderBooksArrayBy(books, "author", order));
    closeMenu();
  });

  // Order By Progress Button Listener
  document.getElementById("order-by-progress").addEventListener("click", () => {
    // Toggle order
    order = order === "asc" ? "desc" : "asc";
    displayBooks(orderBooksArrayBy(books, "progress", order));
    closeMenu();
  });

  // Order By Rating Button Listener
  document.getElementById("order-by-rating").addEventListener("click", () => {
    // Toggle order
    order = order === "asc" ? "desc" : "asc";
    displayBooks(orderBooksArrayBy(books, "rating", order));
    closeMenu();
  });

  // First Display of Books on Page Load
  displayBooks(orderBooksArrayBy(books, "title", order));
});

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

/**
 * Display Books
 * Renders each book as Articles inside Book-List Section.
 * @returns {void}
 */
function displayBooks(books) {
  const bookList = document.getElementById("book-list");
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

/**
 * Utility Function to focus on a book card
 * Adds a highlight class to the card for 1 second.
 * @param {HTMLElement} card - Book card to focus on
 * @returns {void}
 */
function focusOnBookCard(card) {
  if (card) {
    card.classList.add("highlight");
    card.focus();
    card.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => card.classList.remove("highlight"), 1000);
  }
}

/**
 * Utility Function to get books array
 * @returns {Array} - Array of books
 */
function getBooks() {
  return books;
}

export { getBooks, displayBooks, order };
