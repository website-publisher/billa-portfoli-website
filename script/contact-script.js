document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Add event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (name === '' || email === '' || message === '') {
            showPopup('Please fill out all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showPopup('Please enter a valid email address.', 'error');
            return;
        }

        // Save form data locally
        saveFormDataLocally(name, email, message);

        // Show a success message
        showPopup('Your message has been saved and will be processed when online.', 'success');

        // Reset the form
        form.reset();
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Save form data locally for offline use
    function saveFormDataLocally(name, email, message) {
        let formData = JSON.parse(localStorage.getItem('formData')) || [];
        formData.push({ name, email, message, timestamp: new Date() });
        localStorage.setItem('formData', JSON.stringify(formData));
    }

    // Show success or error messages as a popup
    function showPopup(message, type) {
        // Create the popup container
        const popup = document.createElement('div');
        popup.className = 'popup-container ' + type;

        // Create the popup content
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        popupContent.textContent = message;

        // Create a close button for the popup
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.className = 'popup-close';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);
        });

        // Append content and close button to the popup container
        popupContent.appendChild(closeButton);
        popup.appendChild(popupContent);

        // Append the popup container to the body
        document.body.appendChild(popup);

        // Automatically remove the popup after a few seconds
        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }, 5000);
    }

    // Function to toggle the navigation menu
    function toggleMenu() {
        navLinks.classList.toggle('show');
    }

    // Add event listener to the menu toggle button
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close the menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove('show');
        }
    });
});
