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

// BURGER ICON

$(document).ready(function () {
	$(".navbar-toggler").on("click", function () {
		let target = $(this).data("target");
		$(target).toggleClass("collapse");
	});

	$("#navbarSupportedContent").on("show.bs.collapse", function () {
		$(".navbar").addClass("navbar-blur");
	});

	$("#navbarSupportedContent").on("hide.bs.collapse", function () {
		$(".navbar").removeClass("navbar-blur");
	});
});
