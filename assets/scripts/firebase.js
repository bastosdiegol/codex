// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getFirestore,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaagj6KQC06Dj9Jq2l3RZ-MnzebuGcnK8",
  authDomain: "codex-8c3dd.firebaseapp.com",
  projectId: "codex-8c3dd",
  storageBucket: "codex-8c3dd.firebasestorage.app",
  messagingSenderId: "41268053166",
  appId: "1:41268053166:web:8ba1a0503f7a72b6f2d93f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Function to load books from Firestore
 * @async
 * @param {Array} books - The array to store the books from Firestore
 * @returns nothing
 */
async function getBooksFromFirestore(books) {
  var data = await getDocs(collection(db, "codex"));

  data.docs.forEach((doc) => {
    const book = {
      id: doc.id,
      ...doc.data(),
    };
    books.push(book);
  });
}

/**
 * Function to add a book to Firestore
 * @async
 * @param {Object} book - The book object to be added to Firestore
 * @returns {string} The ID of the document added to Firestore
 */
async function addBookToFirestore(book) {
  const docRef = await addDoc(collection(db, "codex"), book);
  return docRef.id;
}

/**
 * Function to update a book in Firestore
 * @async
 * @param {Object} book - The book object to be updated in Firestore
 * @returns {void}
 */
async function updateBookInFirestore(book) {
  const bookRef = doc(db, "codex", book.id);
  await updateDoc(bookRef, {
    cover: book.cover,
    title: book.title,
    author: book.author,
    genre: book.genre,
    progress: book.progress,
    status: book.status,
    rating: book.rating,
  });
}

/**
 * Function to remove a book from Firestore
 * @async
 * @param {string} bookId - The ID of the book to be removed from Firestore
 * @returns {void}
 */
async function removeBookFromFirestore(bookId) {
  const bookRef = doc(db, "codex", bookId);
  await deleteDoc(bookRef);
}

export {
  getBooksFromFirestore,
  addBookToFirestore,
  updateBookInFirestore,
  removeBookFromFirestore,
};
