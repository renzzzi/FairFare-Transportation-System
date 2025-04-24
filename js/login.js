$(document).ready(function () {
    $('#login-btn').on("click", function (event) {
        event.preventDefault(); // Prevent the default form submission
        const username = $("#username").val();
        const password = $("#password").val();

        const adminusername = "admin@test";
        const adminpassword = "1234";

        const clientusername = "client@test";
        const clientpassword = "1234";

        const tsusername = "supervisor@test";
        const tspassword = "1234";

        if (username === adminusername && password === adminpassword) {
            window.location.href = "admin.html";
        }
        else if (username === clientusername && password === clientpassword) {
            window.location.href = "client.html";
        }
        else if (username === tsusername && password === tspassword) {
            window.location.href = "supervisor.html";
        }
        else {
            alert("Incorrect username or password, please try again");
            //window.location.href = "index.html"; //Removed redirect to index.html
        }
    });
});
