# Node.js Guestbook App

> A simple **Guestbook application** built with **Node.js + Express**.  
Users can leave messages that are saved into a JSON file and displayed in a formatted table.  
The project uses **Bootstrap** for styling and **jQuery** for AJAX.


---

## ✨ Features
- **Homepage** with navigation  
- **Guestbook page** (`/guestbook`) displays messages in a table  
- **New Message page** (`/newmessage`) allows submitting messages via form  
- **AJAX Message page** (`/ajaxmessage`) allows submitting via AJAX and updating messages dynamically  
- Messages stored in a **JSON file** (`data.json`)  
- Fully styled with **Bootstrap**  

---
## Install dependencies:
```bash
    npm install
```
## Start the server:
```bash
    node server.js
```
## Open your browser and go to:
```bash
http://localhost:4000
```

## API Endpoints
+ GET /api/messages → Get all guestbook messages
+ POST /api/messages → Add a new message (expects username, country, message in body)



## 📂 Project Structure
```bash
guestbook-app/
│── server.js
│── data.json
│── package.json
│── public/
│    ├── index.html
│    ├── guestbook.html
│    ├── newmessage.html
│    ├── ajaxmessage.html
│    ├── css/
│    │    └── style.css
│    └── js/
│         ├── guestbook.js
│         ├── newmessage.js
│         └── ajaxmessage.js

```
