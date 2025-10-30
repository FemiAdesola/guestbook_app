'use strict';  // Enforces strict mode to prevent unsafe JavaScript practices

// -------------------- IMPORT REQUIRED MODULES --------------------
const express = require("express");        // Web framework for building APIs and handling routes
const bodyParser = require("body-parser"); // Middleware for parsing incoming request bodies
const fs = require("fs").promises;         // File system module with promise-based methods
const path = require("path");              // Utility for handling and transforming file paths

// -------------------- APP CONFIGURATION --------------------
const app = express();                           // Initialize the Express application
const PORT = process.env.PORT || 4000;           // Set the server port (use environment variable or default 4000)
const DATA_FILE = path.join(__dirname, "data.json"); // Path to the JSON file storing guestbook messages

// -------------------- MIDDLEWARE SETUP --------------------
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(bodyParser.json());                         // Parse JSON-formatted request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (HTML) from /public folder

// -------------------- HELPER FUNCTIONS --------------------

/**
 * Reads all messages from the JSON data file.
 * @returns {Array} - Returns an array of messages or an empty array if the file can't be read.
 */
async function getMessages() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");  // Read data from data.json
    return JSON.parse(data);                            // Parse and return JSON as JavaScript array
  } catch (err) {
    console.error("Error reading data.json:", err);      // Log any file read errors
    return [];                                           // Return an empty array as a fallback
  }
}

/**
 * Saves a new message into the JSON file.
 * @param {Object} newMsg - The new message object to save.
 */
async function saveMessage(newMsg) {
  try {
    const messages = await getMessages();                // Load current messages
    messages.push(newMsg);                               // Add the new message to the array
    await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2)); // Save messages back to file (pretty formatted)
  } catch (err) {
    throw err; // Pass error to the calling function for handling
  }
}

// -------------------- ROUTES --------------------

// Serve homepage (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html/index.html"));
});

// Serve guestbook page (list of messages)
app.get("/guestbook", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html/guestbook.html"));
});

// Serve new message submission page
app.get("/newmessage", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html/newmessage.html"));
});

// Serve AJAX message page (interactive interface using AJAX)
app.get("/ajaxmessage", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html/ajaxmessage.html"));
});

// -------------------- API ENDPOINTS --------------------

/**
 * GET /api/messages
 * Fetches all guestbook messages and returns them as JSON.
 */
app.get("/api/messages", async (req, res) => {
  const messages = await getMessages(); // Retrieve messages from file
  res.json(messages);                   // Send messages as JSON response
});

/**
 * POST /api/messages
 * Adds a new guestbook entry.
 * Validates input, generates an ID, saves message, and returns it.
 */
app.post("/api/messages", async (req, res) => {
  try {
    const { username, country, message } = req.body; // Destructure input fields from request

    // Validate that all required fields are provided
    if (!username || !country || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    // Get the latest messages to determine the next message ID
    const messages = await getMessages();
    const lastId = messages.length > 0 ? Number(messages[messages.length - 1].id) : 0;

    // Construct the new message object
    const newMsg = {
      id: lastId + 1,                  // Generate a new incremental ID
      username,                        // Sender’s name
      country,                         // Sender’s country
      message,                         // Message text
      date: new Date().toLocaleString() // Store current date/time as a readable string
    };

    await saveMessage(newMsg); // Save new message to file

    res.json(newMsg); // Send the newly added message back to the client as confirmation
  } catch (err) {
    console.error("❌ Error saving message:", err); // Log the error to the console
    res.status(500).json({ error: "Server error while saving message" }); // Return server error response
  }
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`); // Log confirmation message
});
