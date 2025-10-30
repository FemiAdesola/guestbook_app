// Wait until the HTML document is fully loaded before running any JavaScript
$(document).ready(function () {

  // ================= FORM SUBMISSION HANDLER =================
  // Attach a submit event listener to the form with ID "newMessageForm"
  $("#newMessageForm").submit(function (e) {
    e.preventDefault(); // Prevent the browser from refreshing or redirecting on form submission

    // Collect form data from input fields
    const data = {
      username: $("#username").val(),  // Get the username entered by the user
      country: $("#country").val(),    // Get the user’s country
      message: $("#message").val()     // Get the message text
    };

    // ================= AJAX POST REQUEST =================
    // Send the collected data to the backend server using an AJAX request
    $.post({
      url: "/api/messages",              // API endpoint that handles new message submissions
      type: "POST",                      // HTTP method used for sending data
      contentType: "application/json",   // Specify that the data format is JSON
      data: JSON.stringify(data),        // Convert the JavaScript object to a JSON string

      // ===== SUCCESS HANDLER =====
      success: function () {
        alert("Message submitted successfully!"); // Notify the user of success
        $("#newMessageForm")[0].reset();          // Clear the form fields after submission
        window.location.href = "/guestbook";      // Redirect user to the Guestbook page to view all messages
      },

      // ===== ERROR HANDLER =====
      error: function (err) {
        // Default error message
        let errorMessage = "Unknown error";

        // Check if the server returned a JSON error message
        if (err.responseJSON && err.responseJSON.error) {
            errorMessage = err.responseJSON.error;
        }
        // Or check if there’s plain text error information
        else if (err.responseText) {
            errorMessage = err.responseText;
        }

        // Display the error message to the user
        alert("Error submitting message: " + errorMessage);
      }
    });
  });
});
