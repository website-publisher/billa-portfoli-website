// Function to toggle the navigation menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
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

        // Close the menu on mobile after clicking a link
        if (window.innerWidth <= 768) {
            toggleMenu(); // Close the menu by toggling the active class
        }
    }
}

// Function to highlight the active link based on scroll position
function highlightActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - document.querySelector('nav').offsetHeight;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Function to change navigation bar color on scroll
function handleScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    highlightActiveLink(); // Update active link based on scroll position
}

// Function to close the menu if clicked outside
function closeMenuOnClickOutside(event) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    // Check if the click was outside the menu and menu toggle
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
    }
}

// Add event listener to the menu toggle button
document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);

// Add event listeners to navigation links for smooth scrolling
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// Add event listener for scroll events
window.addEventListener('scroll', handleScroll);

// Optionally, add event listener for resizing to handle menu on desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && document.querySelector('.nav-links').classList.contains('active')) {
        toggleMenu(); // Close menu if open when resizing to desktop
    }
});

// Add event listener to close menu if clicking outside of it
document.addEventListener('click', closeMenuOnClickOutside);
