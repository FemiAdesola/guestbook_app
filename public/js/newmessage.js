$(document).ready(function () {
  $("#newMessageForm").submit(function (e) {
    e.preventDefault();

    const data = {
      username: $("#username").val(),
      country: $("#country").val(),
      message: $("#message").val()
    };

    $.post({
      url: "/api/messages",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function () {
        alert("Message submitted successfully!");
        $("#newMessageForm")[0].reset();
        window.location.href = "/guestbook";
      },
      error: function (err) {
        let errorMessage = "Unknown error";
        if (err.responseJSON && err.responseJSON.error) {
            errorMessage = err.responseJSON.error;
        } else if (err.responseText) {
            errorMessage = err.responseText;
        }
        alert("Error submitting message: " + errorMessage);
        // alert("All fields required!");
      }
    });
  });
});
