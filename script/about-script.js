// about-script.js

// Function to toggle the navigation menu on mobile devices
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Function to close the menu
function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
    }
}

// Function to handle smooth scrolling to sections
function smoothScroll(event) {
    if (this.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('nav').offsetHeight,
                behavior: 'smooth'
            });
        }

        // Close the menu after navigating
        closeMenu();
    }
}

// Add event listener to the menu toggle button
document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);

// Add event listeners to navigation links for smooth scrolling and menu closing
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// Function to change the background color of the navigation bar on scroll
function handleScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Add event listener for scroll events
window.addEventListener('scroll', handleScroll);

// Add event listener for clicking outside the menu to close it
document.addEventListener('click', (event) => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    // Check if the click is outside of the menu and the toggle button
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
    }
});

// Optional: Handle resizing to adjust menu visibility
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && document.querySelector('.nav-links').classList.contains('show')) {
        closeMenu(); // Close menu if open when resizing to desktop
    }
});
