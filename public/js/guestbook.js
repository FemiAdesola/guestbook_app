$(document).ready(function () {
  $.get("/api/messages", function (data) {
    let rows = "";
    data.forEach(msg => {
      rows += `
        <tr>
            <td>${msg.id}</td>
            <td>${msg.username}</td>
            <td>${msg.country}</td>
            <td>${msg.message}</td>
        </tr>`;
    });
    $("#messagesTable tbody").html(rows);
  })
  .fail(function () {
      $("#messagesTable").html(
        "<tr><td colspan='4' class='text-danger'>Failed to load messages</td></tr>"
      );
  });
});
