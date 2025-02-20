import { auth } from "./firebase.js";
import { openBookForm } from "./utility.js";

const menu = document.getElementById("side-menu");
const overlay = document.getElementById("menu-overlay");
const burgerMenu = document.getElementById("burger-menu");
const closeButton = document.getElementById("close-menu");
const addBookLink = document.getElementById("add-book-link");
const singOutLink = document.getElementById("sign-out");

// Menu functionality for the website.
document.addEventListener("DOMContentLoaded", () => {
  burgerMenu.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // Burguer Menu Functionality
  toggleMenuTabIndex(false);
});

/**
 * Opens the lateral menu.
 * @returns {void}
 */
function openMenu() {
  menu.classList.add("open");
  overlay.classList.add("show");
  toggleMenuTabIndex(true);
  trapFocusWithinMenu();
}

/**
 * Closes the lateral menu.
 * @returns {void}
 */
function closeMenu() {
  menu.classList.remove("open");
  overlay.classList.remove("show");
  toggleMenuTabIndex(false);
}

/**
 * Toggle Menu TabIndex
 * Adds or removes tabindex attribute to menu links and close button.
 * @param {boolean} isVisible - Determines if the menu is visible or not
 * @returns {void}
 */
function toggleMenuTabIndex(isVisible) {
  const menuLinks = menu.querySelectorAll("nav a");
  const closeButton = menu.querySelector("#close-menu");
  menuLinks.forEach((link) => {
    if (isVisible) {
      link.setAttribute("tabindex", "0");
    } else {
      link.setAttribute("tabindex", "-1");
    }
  });
  if (isVisible) {
    closeButton.setAttribute("tabindex", "0");
  } else {
    closeButton.setAttribute("tabindex", "-1");
  }
}

/**
 * Trap Focus Within Menu
 * Allows for keyboard navigation within the menu.
 * @returns {void}
 */
function trapFocusWithinMenu() {
  const menuLinks = menu.querySelectorAll("a");
  const closeButton = menu.querySelector("#close-menu");
  const firstLink = menuLinks[0];
  const lastLink = menuLinks[menuLinks.length - 1];

  menu.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstLink) {
          closeButton.focus();
          event.preventDefault();
        } else if (document.activeElement === closeButton) {
          lastLink.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastLink) {
          closeButton.focus();
          event.preventDefault();
        } else if (document.activeElement === closeButton) {
          firstLink.focus();
          event.preventDefault();
        }
      }
    }
  });
}

// Add Book Link Listener
addBookLink.addEventListener("click", (event) => {
  event.preventDefault();
  openBookForm();
  closeMenu();
});

// Sign Out Link Listener
singOutLink.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    await auth.signOut();
    window.location = "index.html";
  } catch (error) {
    console.error("Error signing out: ", error);
  }
});

export { closeMenu };
