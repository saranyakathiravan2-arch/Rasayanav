// ======================================================
// Rasayanav Contact Form - EmailJS
// ======================================================
console.log("contact.js loaded");

console.log("EmailJS object:", window.emailjs);

const PUBLIC_KEY = "aOTaA9Nmn9TNRnomz";
const SERVICE_ID = "service_on56z3h";
const TEMPLATE_ID = "template_cquqcaa";

if (typeof emailjs === "undefined") {
    console.error("EmailJS library not loaded.");
} else {
    emailjs.init({
        publicKey: PUBLIC_KEY
    });
}


const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    clearErrors();

    if (!validateForm()) return;

    submitBtn.disabled = true;
    btnText.innerHTML = "Sending...";

    try {

        await emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            "#contact-form"
        );

        formMessage.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                Thank you! Your enquiry has been sent successfully.
                Our team will contact you shortly.
            </div>
        `;

        form.reset();

    } catch (error) {

        console.error(error);

        formMessage.innerHTML = `
            <div class="error-message">
                <i class="fas fa-times-circle"></i>
                Something went wrong.
                Please try again.
            </div>
        `;

    } finally {

        submitBtn.disabled = false;
        btnText.innerHTML = "Get a Free Consultation";

    }

});

function validateForm() {

    let valid = true;

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const consent = document.getElementById("consent").checked;

    if (name === "") {

        showError("name-error", "Please enter your name.");
        valid = false;

    }

    if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {

        showError("phone-error", "Please enter a valid phone number.");
        valid = false;

    }

    if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        showError("email-error", "Please enter a valid email.");
        valid = false;

    }

    if (service === "") {

        showError("service-error", "Please select a product.");
        valid = false;

    }

    if (!consent) {

        showError("consent-error", "Please accept the consent.");
        valid = false;

    }

    return valid;

}

function showError(id, message) {

    document.getElementById(id).textContent = message;

}

function clearErrors() {

    document.querySelectorAll(".form-error").forEach(error => {
        error.textContent = "";
    });

    formMessage.innerHTML = "";

}