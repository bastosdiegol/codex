// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getFirestore,
  collection,
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
