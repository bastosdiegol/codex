document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const menu = document.getElementById("side-menu");
  const overlay = document.getElementById("menu-overlay");
  const burgerMenu = document.getElementById("burger-menu");
  const closeButton = document.getElementById("close-menu");

  // Burguer Menu Functionality
  function openMenu() {
    menu.classList.add("open");
    overlay.classList.add("show");
  }

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("show");
  }

  burgerMenu.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // Display Books Functionality
  let books = [
    {
      id: 1,
      cover: "",
      title: "Mother of Learning",
      author: "nobody103, Domagoj Kurmaić",
      genre: "Fantasy, Magic, Time Travel",
      progress: 100,
      status: "Read",
      rating: 5,
    },
    {
      id: 2,
      cover: "",
      title: "A Practical Guide to Sorcery",
      author: "Azalea Ellis",
      genre: "Fantasy, Magic, Gender Bender",
      progress: 90,
      status: "Reading",
      rating: 4,
    },
    {
      id: 3,
      cover: "",
      title: "Os Sete",
      author: "André Vianco",
      genre: "Horror, Vampires",
      progress: 100,
      status: "Read",
      rating: 5,
    },
    {
      id: 4,
      cover: "",
      title: "Super Supportive",
      author: "Sleyca",
      genre: "Super Heroes, Slice of Life",
      progress: 90,
      status: "Dropped",
      rating: 3,
    },
    {
      id: 5,
      cover: "",
      title: "The Path of Ascension",
      author: "C. Mantis",
      genre: "Fantasy, Magic, LitRPG",
      progress: 100,
      status: "Read",
      rating: 5,
    },
    {
      id: 6,
      cover: "",
      title: "Dungeon Crawler Carl",
      author: "Matt Dinniman",
      genre: "LitRPG, Apocalypse, Dungeon",
      progress: 100,
      status: "Read",
      rating: 4,
    },
    {
      id: 7,
      cover: "",
      title: "The Hedge Wizard",
      author: "Alex Maher",
      genre: "Fantasy, Magic, Adventure",
      progress: 100,
      status: "Read",
      rating: 5,
    },
  ];

  function displayBooks() {
    bookList.innerHTML = "";
    books.forEach((book) => {
      // Book Article
      const bookCard = document.createElement("article");
      bookCard.classList.add("book-card");
      bookCard.setAttribute("aria-labelledby", `book-title-${book.id}`);
      // Book image container
      if (book.cover !== "") {
        const bookImgDiv = document.createElement("div");
        bookImgDiv.classList.add("book-img");
        const bookImg = document.createElement("img");
        bookImg.src =
          book.cover === ""
            ? "./images/book-cover-placeholder.jpg"
            : book.cover;
        bookImg.alt = "Book Cover";
        bookImgDiv.appendChild(bookImg);
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
      bookGenre.innerHTML = `<strong>Genre:</strong> ${book.genre}`;
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
      // Append image and info to article
      if (book.cover !== "") bookCard.appendChild(bookImgDiv);
      bookCard.appendChild(bookInfoDiv);
      bookCard.appendChild(bookRatingSpan);
      // Append Article and
      bookList.appendChild(bookCard);
    });
  }

  function renderStars(rating) {
    return "&starf;".repeat(rating) + "&star;".repeat(5 - rating);
  }

  displayBooks();
});
