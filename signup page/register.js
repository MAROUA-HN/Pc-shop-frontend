 document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('.login_card');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            
            event.preventDefault();


            const fullNameInput = registrationForm.querySelector('input[name="full name"]');
            const emailInput = registrationForm.querySelector('input[name="email"]');
            const passwordInput = registrationForm.querySelector('input[name="password"]');

            const fullName = fullNameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

        
            if (fullName.length < 3) {
                alert('Please enter your full name (at least 3 characters).');
                fullNameInput.focus();
                return;
            }

            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                passwordInput.focus();
                return;
            }

    
            console.log('Form data looks valid! Submitting details...');
            
            
    
            alert(`Account created successfully! Welcome to Pc_Shop, ${fullName}!`);
            
        });
    }
});
