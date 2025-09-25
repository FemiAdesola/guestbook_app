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

// For Saving new message
async function saveMessage(newMsg) {
  try {
    const messages = await getMessages();
    messages.push(newMsg);
    await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
  } catch (err) {
    throw err;
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


// Add new message - Updated with validation and error handling

app.post("/api/messages", async (req, res) => {
  try {
    const { username, country, message } = req.body;

    if (!username || !country || !message) {
      return res.status(400).json({ error: "All fields required" });
    }
    
    // For generating new ID
    const messages = await getMessages();
    const lastId = messages.length > 0 ? Number(messages[messages.length - 1].id) : 0;
    //

    // Create new message object
    const newMsg = {
        id: lastId + 1,
        username,
        country,
        message,
        date: new Date().toLocaleString()
    };

    await saveMessage(newMsg);

    res.json(newMsg);
  } catch (err) {
    console.error("❌ Error saving message:", err);
    res.status(500).json({ error: "Server error while saving message" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
