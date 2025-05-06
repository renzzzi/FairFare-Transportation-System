document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("registerForm");
	const password = document.getElementById("password");
	const confirmPassword = document.getElementById("confirmPassword");
	const email = document.getElementById("email");
	const phone = document.getElementById("phone");
	const fullName = document.getElementById("fullName");
	const dob = document.getElementById("dob");

	// Set max date for DOB (must be at least 18 years old)
	const today = new Date();
	const maxDate = new Date(
		today.getFullYear() - 18,
		today.getMonth(),
		today.getDate()
	);
	dob.max = maxDate.toISOString().split("T")[0];

	// Password strength meter
	password.addEventListener("input", function () {
		const strength = checkPasswordStrength(this.value);
		updatePasswordStrengthMeter(strength);
	});

	// Phone number formatting
	phone.addEventListener("input", function (e) {
		let x = e.target.value
			.replace(/\D/g, "")
			.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		e.target.value = !x[2]
			? x[1]
			: "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
	});

	// Form validation
	form.addEventListener("submit", function (e) {
		e.preventDefault();

		if (validateForm()) {
			// Collect form data
			const formData = {
				fullName: fullName.value,
				email: email.value,
				phone: phone.value,
				dob: dob.value,
				password: password.value,
				newsletter: document.getElementById("newsletterCheck").checked,
			};

			// Here you would typically send the data to your server
			console.log("Form submitted:", formData);

			// Show success modal instead of alert
			$("#successModal").modal("show");

			// Reset form after modal is closed
			$("#successModal").on("hidden.bs.modal", function () {
				form.reset();
			});
		}
	});

	function validateForm() {
		let isValid = true;

		// Reset previous validation
		removeValidationStyles(fullName);
		removeValidationStyles(email);
		removeValidationStyles(phone);
		removeValidationStyles(password);
		removeValidationStyles(confirmPassword);
		removeValidationStyles(dob);

		// Validate Full Name
		if (!fullName.value.trim() || fullName.value.trim().length < 2) {
			showError(fullName, "Please enter your full name (minimum 2 characters)");
			isValid = false;
		}

		// Validate Email
		if (!isValidEmail(email.value)) {
			showError(email, "Please enter a valid email address");
			isValid = false;
		}

		// Validate Phone
		if (!isValidPhone(phone.value)) {
			showError(phone, "Please enter a valid phone number");
			isValid = false;
		}

		// Validate Date of Birth
		if (!dob.value) {
			showError(dob, "Please enter your date of birth");
			isValid = false;
		}

		// Validate Password
		if (password.value.length < 8) {
			showError(password, "Password must be at least 8 characters long");
			isValid = false;
		}

		// Validate Confirm Password
		if (password.value !== confirmPassword.value) {
			showError(confirmPassword, "Passwords do not match");
			isValid = false;
		}

		// Validate Terms & Conditions
		if (!document.getElementById("termsCheck").checked) {
			alert("Please accept the Terms & Conditions");
			isValid = false;
		}

		return isValid;
	}

	function showError(element, message) {
		element.classList.add("is-invalid");

		// Create or update error message
		let feedback = element.nextElementSibling;
		if (!feedback || !feedback.classList.contains("invalid-feedback")) {
			feedback = document.createElement("div");
			feedback.className = "invalid-feedback";
			element.parentNode.appendChild(feedback);
		}
		feedback.textContent = message;
	}

	function removeValidationStyles(element) {
		element.classList.remove("is-invalid");
		element.classList.remove("is-valid");

		// Remove existing feedback elements
		const feedback = element.nextElementSibling;
		if (feedback && feedback.classList.contains("invalid-feedback")) {
			feedback.remove();
		}
	}

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function isValidPhone(phone) {
		return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
	}

	function checkPasswordStrength(password) {
		let strength = 0;

		// Length check
		if (password.length >= 8) strength++;

		// Contains number
		if (/\d/.test(password)) strength++;

		// Contains letter
		if (/[a-zA-Z]/.test(password)) strength++;

		// Contains special character
		if (/[!@#$%^&*]/.test(password)) strength++;

		return strength;
	}

	function updatePasswordStrengthMeter(strength) {
		// Remove existing meter if it exists
		let existingMeter = document.querySelector(".password-strength");
		if (existingMeter) existingMeter.remove();

		// Create new meter
		const meter = document.createElement("div");
		meter.className = "password-strength";
		const meterInner = document.createElement("div");
		meterInner.className = "password-strength-meter";

		if (strength <= 2) {
			meterInner.classList.add("weak");
		} else if (strength === 3) {
			meterInner.classList.add("medium");
		} else {
			meterInner.classList.add("strong");
		}

		meter.appendChild(meterInner);
		password.parentNode.appendChild(meter);
	}
});
