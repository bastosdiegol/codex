import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { closeMenu } from "./menu.js";
import { sanitizeInput } from "./app.js";

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
    prompt = prompt.toLowerCase();
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
  console.log("close chatbot");
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
