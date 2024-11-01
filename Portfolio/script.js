document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const backToTopButton = document.getElementById('backtopBtn');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    // Change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopButton.style.display = 'block'; // Show back-to-top button
        } else {
            header.classList.remove('scrolled');
            backToTopButton.style.display = 'none'; // Hide back-to-top button
        }
    });

    // Scroll to top functionality
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
});
