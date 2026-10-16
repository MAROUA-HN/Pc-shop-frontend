const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

if (newsletterForm && emailInput && message) {

    newsletterForm.addEventListener("submit", function (event) {

        // Prevent page reload
        event.preventDefault();

        // Get the email entered by the user
        const email = emailInput.value.trim();

        if (email !== "") {
            message.textContent =
                "Thank you! Your email has been received.";

            emailInput.value = "";
        }

    });

}
