// Wait until the entire HTML document is fully loaded before running the script
$(document).ready(function () {

  // ================= FETCH MESSAGES FROM THE SERVER =================
  // Send a GET request to the API endpoint "/api/messages" to retrieve all stored messages
  $.get("/api/messages", function (data) {

    // Initialize an empty string to build table rows dynamically
    let rows = "";

    // Loop through each message object returned from the API
    data.forEach(msg => {
      // Append a table row (<tr>) with message details (ID, Username, Country, Message)
      rows += `
        <tr>
            <td>${msg.id}</td>           <!-- Message ID -->
            <td>${msg.username}</td>     <!-- User’s name -->
            <td>${msg.country}</td>      <!-- User’s country -->
            <td>${msg.message}</td>      <!-- Message text -->
        </tr>`;
    });

    // Insert the generated rows into the <tbody> of the table with ID "messagesTable"
    $("#messagesTable tbody").html(rows);
  })

  // ================= ERROR HANDLING =================
  // If the GET request fails (e.g., server error, network issue, etc.)
  .fail(function () {
      // Display an error message inside the table indicating that loading failed
      $("#messagesTable").html(
        "<tr><td colspan='4' class='text-danger'>Failed to load messages</td></tr>"
      );
  });
});
