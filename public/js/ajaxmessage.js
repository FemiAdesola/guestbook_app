'use strict'; 
// Enforces strict mode for safer JavaScript (prevents undeclared variables, etc.)

// ================= FUNCTION: Load and Display Messages =================
function loadAjaxMessages() {
  // Send a GET request to fetch all messages from the server API endpoint
  $.get("/api/messages", function (messages) {
    
    // Start building an HTML table to display the messages
    let items = `
        <table class='table table-striped'>
            <tr>
                <th>#</th>
                <th>User</th>
                <th>Country</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        `;

    // Loop through each message object received from the server
    messages.forEach(m => {
      items += `
        <tr>
            <td>${m.id}</td>                       <!-- Message ID -->
            <td>${m.username}</td>                 <!-- Username -->
            <td>${m.country}</td>                  <!-- User’s country -->
            <td>${m.message}</td>                  <!-- Message content -->
            <td>${
              // Format message date (e.g., "Oct 29 2025")
              new Date(m.date)
                .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                .replace(",", "")
            }</td>
        </tr>`;
    });

    // Inject the generated table into the page inside the #messages container
    $("#messages").html(items);
  });
}

// ================= DOCUMENT READY =================
$(document).ready(function () {
  // Load and display existing messages as soon as the page is ready
  loadAjaxMessages();

  // ================= FORM SUBMISSION HANDLER =================
  $("#ajaxForm").submit(function (e) {
    e.preventDefault(); // Prevent the default page reload behavior on form submit

    // Collect user input values from form fields
    const data = {
      username: $("#ajaxUsername").val(),
      country: $("#ajaxCountry").val(),
      message: $("#ajaxMessage").val()
    };

    // Send a POST request to the server API to add a new message
    $.ajax({
      url: "/api/messages",               // API endpoint
      type: "POST",                       // HTTP method
      contentType: "application/json",    // Data type being sent
      data: JSON.stringify(data),         // Convert JS object to JSON string

      // If successful: clear form and refresh message list
      success: function () {
        $("#ajaxForm")[0].reset();        // Reset the form inputs
        loadAjaxMessages();               // Reload messages to show the new one
      },

      // If error occurs (e.g., missing input fields)
      error: function () {
        alert("All fields required!");    // Simple alert for validation feedback
      }
    });
  });
});
