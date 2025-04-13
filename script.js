document.addEventListener("DOMContentLoaded", function () {
	let btnburger = document.querySelector(".burger-icon");
	let mobileNavUpper = document.querySelector(".mobile-nav.lower");

	btnburger.addEventListener("click", function () {
		mobileNavUpper.classList.toggle("show-menu");
	});

	window.addEventListener("resize", function () {
		if (window.innerWidth > 1100) {
			mobileMenu.classList.remove("show-menu");
		}
	});
});