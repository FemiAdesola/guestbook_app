'use strict';
function loadAjaxMessages() {
  $.get("/api/messages", function (messages) {
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
    messages.forEach(m => {
      items += `
        <tr>
            <td>${m.id}</td>
            <td>${m.username}</td>
            <td>${m.country}</td>
            <td>${m.message}</td>
            <td>${new Date(m.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).replace(",", "")}</td>
        </tr>`;
    });
    $("#messages").html(items);
  });
}

$(document).ready(function () {
  // Load existing messages
  loadAjaxMessages();

  // Handle form submit
  $("#ajaxForm").submit(function (e) {
    e.preventDefault();

    const data = {
      username: $("#ajaxUsername").val(),
      country: $("#ajaxCountry").val(),
      message: $("#ajaxMessage").val()
    };

    $.ajax({
      url: "/api/messages",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function () {
        $("#ajaxForm")[0].reset();
        loadAjaxMessages();
      },
      error: function () {
        alert("All fields required!");
      }
    });
  });
});
