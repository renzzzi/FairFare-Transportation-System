function burgerHandler() {
	let theNavBar = document.getElementsByClassName("header-nav");

	if (theNavBar.className === "header-nav") {
		theNavBar.className += " responsive";
	} else {
		theNavBar.className = "header-nav";
	}
}