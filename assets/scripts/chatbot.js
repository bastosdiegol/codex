import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { closeMenu } from "./menu.js";
import { openBookForm, sanitizeInput, orderBooksArrayBy } from "./utility.js";
import books, { displayBooks } from "./app.js";

const chatbotContainer = document.getElementById("chatbot-container");
const openChatbotBtn = document.getElementById("open-chatbot");
const closeChatbotBtn = document.getElementById("close-chatbot");

var apiKey;
var genAI;
var model;

const aiInput = document.getElementById("ai-chat-input");
const chatHistory = document.getElementById("chat-history");

getApiKey();

// Chatbot Form Submit Event Listener
document
  .getElementById("chatbot-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    // Sanitize and Print User Input
    let prompt = sanitizeInput(aiInput.value.trim());
    appendMessage("You: " + prompt);
    // Check if prompt is empty and for chatbot rules
    if (prompt) {
      aiInput.value = "";
      if (!ruleChatBot(prompt)) {
        await askChatBot(prompt);
      }
    } else {
      appendMessage("Please enter a prompt");
    }
    chatHistory.scrollTop = chatHistory.scrollHeight;
  });

// Chatbot Menu Link Event Listeners
chatbotContainer.addEventListener("click", () => {
  chatbotContainer.classList.toggle("expanded");
});

// Open Chatbot Event Listeners
openChatbotBtn.addEventListener("click", () => {
  chatbotContainer.style.display = "block";
  closeMenu();
  aiInput.focus();
});

closeChatbotBtn.addEventListener("click", () => {
  chatbotContainer.style.display = "none";
});

// Get Chatbot API Key
async function getApiKey() {
  let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
  apiKey = snapshot.data().key;
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// Chatbot App Rules
function ruleChatBot(request) {
  const lowerCaseRequest = request.toLowerCase();
  console.log(lowerCaseRequest);

  // Add Book Rule
  if (lowerCaseRequest.startsWith("add book")) {
    let book = request.slice(8).trim();
    if (book) {
      openBookForm(null, book);
      appendMessage("ChatBot: Book Form for " + book + " open!");
    } else {
      openBookForm();
      appendMessage("ChatBot: Book Form open!");
    }
    return true;
    // Close Chat Rule
  } else if (lowerCaseRequest.startsWith("close chat")) {
    chatbotContainer.style.display = "none";
    return true;
    // Order By Rule
  } else if (lowerCaseRequest.startsWith("order by")) {
    let fieldAndOrder = request.slice(8).trim();
    let field = fieldAndOrder.split(" ")[0];
    let order = fieldAndOrder.split(" ")[1];
    // Validate Order
    if (order === undefined) {
      order = "asc";
    }
    if (order.startsWith("asc") && order.startsWith("desc")) {
      appendMessage("ChatBot: Please specify an order of 'asc' or 'desc'!");
      return true;
    }
    // Check if Field Exist and is in [title, author, progress, rating]
    if (field && ["title", "author", "progress", "rating"].includes(field)) {
      displayBooks(orderBooksArrayBy(books, field, order));
      order = order.startsWith("asc") ? "ascending" : "descending";
      appendMessage(
        "ChatBot: Books ordered by " + field + " in " + order + " order!"
      );
    } else {
      appendMessage(
        "ChatBot: Please specify a valid field to order by! (title, author, progress or rating)"
      );
    }
    return true;
  }
  return false;
}

// Ask Chatbot
async function askChatBot(request) {
  let result = await model.generateContent(request);
  appendMessage("ChatBot: " + result.response.text());
}

// Append Chat History
function appendMessage(message) {
  let history = document.createElement("p");
  history.textContent = message;
  history.className = "history";
  chatHistory.appendChild(history);
  aiInput.value = "";
}
