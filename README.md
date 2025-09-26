# Node.js Guestbook App

> A simple **Guestbook application** built with **Node.js + Express**.  
Users can leave messages that are saved into a JSON file and displayed in a formatted table.  
The project uses **Bootstrap** for styling and **jQuery** for AJAX.


---
See live Guestbook App [here](https://guestbook-app-ak3t.onrender.com/)
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
    or 
    npm start
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
# Get started

## Home page
> On the home page, the user has three precise options for interaction. First, the user may access the Guestbook Page to view the total number of entries recorded by previous visitors. Second, the user may click the New Message Page button to submit a message by entering specific details, including username, country, and message content. Third, the user may select the Ajax Message Page button to provide the same information as on the New Message Page. However, on this page, the submitted message appears instantly without requiring a refresh, ensuring immediate confirmation of the entered information.

![Homepage](/img/Homepage.png)

## Guestbook page
> On the Guestbook page, users can view entries submitted by others, including each contributor’s name, country, and message. This page provides a clear record of shared content, allowing visitors to read and understand contributions from different individuals across locations. After reviewing the guestbook entries, users can easily return to the main interface by clicking the Back to Home button, which redirects them directly to the Home page for continued navigation and further interaction with the platform’s available features.

![Guestbook](/img/GuestbookPage.png)

## Newmessage page
> On the New Message page, users are required to provide three specific inputs: username, country, and message content. All fields must be completed before submission; if any field is left empty, the system prevents the message from being posted. Once the user enters the required details and clicks the Submit Message button, the information is recorded, and the system automatically redirects the user to the Home page. This ensures a smooth transition after completing the entry process. However, if the user chooses not to complete the form, they can return to the Home page by selecting the Back to Home button. This option allows users to exit the form without submitting any data while maintaining consistent navigation.

![Newmessage](/img/Newmessagepage.png)

## Ajax message page
> On the Ajax Message page, users follow the same procedure as on the New Message page by entering their username, country, and message. After completing the required fields, they click the Submit via AJAX button to publish the message. Unlike the standard submission process, the Ajax method displays the result immediately at the bottom of the page without requiring a reload. The displayed result includes the submitted username, country, message content, and the exact date of posting, ensuring users receive instant confirmation of their entry. This real-time update enhances the interaction experience and saves time. If users choose to leave the page instead of submitting a message, they can return to the Home page by clicking the Back to Home button.

![Ajaxmessage](/img/AjaxMessagepage1.png)
![Ajaxmessage](/img/AjaxMessagepage2.png)