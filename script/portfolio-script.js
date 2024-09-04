document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Function to toggle the navigation menu
    function toggleMenu() {
        navLinks.classList.toggle('show');
    }

    // Function to close the navigation menu
    function closeMenu() {
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    }

    // Add event listener to the menu toggle button
    if (menuToggle) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event bubbling
            toggleMenu();
        });
    }

    // Close the menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    // Optional: Close the menu when navigating to a new page (if using AJAX or similar)
    // This will ensure the menu closes when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Optional: Keyboard navigation for menu toggle (for accessibility)
    if (menuToggle) {
        menuToggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                toggleMenu();
                event.preventDefault(); // Prevent default action for space key
            }
        });
    }
});
