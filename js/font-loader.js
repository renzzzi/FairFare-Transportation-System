(function loadFontCDN() {
	const preconnect = document.createElement("link");
	preconnect.rel = "preconnect";
	preconnect.href = "https://fonts.bunny.net";

	const fontStylesheet = document.createElement("link");
	fontStylesheet.rel = "stylesheet"; 
	fontStylesheet.href = "https://fonts.bunny.net/css?family=montserrat";

	document.head.appendChild(preconnect);
	document.head.appendChild(fontStylesheet);
})();