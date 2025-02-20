import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

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

/**
 * Sign In with Google
 * @returns {void}
 */
function signIn() {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location = "app.html";
      // Note: sessionStore removed.
      // I'll be asking firestore if the user is authenticated.
    })
    .catch((error) => {
      console.error("Error signing in: ", error);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
  const signInBttn = document.getElementById("sign-in");

  signInBttn.addEventListener("click", function () {
    signIn(auth, provider);
  });
});
