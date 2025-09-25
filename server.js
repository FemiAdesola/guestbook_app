'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const path = require("path");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, "data.json");


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));


// Helpers
async function getMessages() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err){
    console.error("Error reading data.json:", err);
    return [];
  }
}


// -------------------- ROUTES --------------------

// 1. Home page
// "/" → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html/index.html"));
});

// "/guestbook" → guestbook.html
app.get("/guestbook", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html/guestbook.html"));
});

// "/newmessage" → newmessage.html
app.get("/newmessage", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html/newmessage.html"));
});

// "/ajaxmessage" → ajaxmessage.html
app.get("/ajaxmessage", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html/ajaxmessage.html"));
});

// -------------------- API ENDPOINTS --------------------

// Get all messages
app.get("/api/messages", async (req, res) => {
  const messages = await getMessages();
  res.json(messages);
});


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

