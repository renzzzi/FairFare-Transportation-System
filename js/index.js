document.addEventListener("DOMContentLoaded", function () {
	const subscribeForm = document.getElementById("subscribeForm");
	const messageForm = document.getElementById("messageForm");

	subscribeForm.addEventListener("submit", function (e) {
		e.preventDefault();

		// Show subscribed modal instead of alert
		$("#subscribedModal").modal("show");
	});

	messageForm.addEventListener("submit", function (e) {
		e.preventDefault();

		// Show message sent modal instead of alert
		$("#messageSentModal").modal("show");
	});
});
