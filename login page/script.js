 document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("passwordInput");
    const togglePassword = document.getElementById("togglePassword");


    togglePassword.addEventListener("click", () => {
    
        const isPassword = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", isPassword ? "text" : "password");
    });

    
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (passwordInput.value.length < 6) {
                alert("⚠️ كلمة المرور قصيرة جداً.");
                return;
            }
            window.location.href = "homepage.html";
        });
    }
});

