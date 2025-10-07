/**
 * Global JavaScript for Lake City Ultrabots Team 8041 Website
 * Contains functionality needed across multiple pages (e.g., navigation)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation (needed on all pages)
    initMobileNavigation();
    setupSubNavToggle();


    // Add any other truly GLOBAL initializations here if needed in the future

     /**
     * Mobile Navigation - Handles responsive menu toggle and animations
     */
     function initMobileNavigation() {
        const menuToggle = document.getElementById('mobile-menu');
        const nav = document.querySelector('nav');

        // Exit initialization if essential elements are missing
        if (!menuToggle || !nav) {
            // console.warn("Mobile navigation elements not found."); // Optional warning
            return;
        }

        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            this.classList.toggle('active'); // Toggle active class on the button itself

            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (spans.length >= 3) {
                if (this.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
             if (!event.target.closest('nav') &&
                 !event.target.closest('.menu-toggle') &&
                 nav.classList.contains('open')) {
                 closeMobileMenu(nav, menuToggle);
             }
         });

         // Close menu when window is resized to desktop view
         window.addEventListener('resize', function() {
             if (window.innerWidth > 768 && nav.classList.contains('open')) {
                 closeMobileMenu(nav, menuToggle);
             }
         });

         // Add active class to current page navigation link
         highlightActiveNavLink();
    }

    /** Helper to close mobile menu and reset toggle */
    function closeMobileMenu(navElement, toggleElement) {
        navElement.classList.remove('open');
        if (toggleElement) {
             toggleElement.classList.remove('active');
             // Reset hamburger animation
             const spans = toggleElement.querySelectorAll('span');
             if (spans.length >= 3) {
                 spans[0].style.transform = 'none';
                 spans[1].style.opacity = '1';
                 spans[2].style.transform = 'none';
             }
        }
    }

    /**
 * Sets up the mobile sub-navigation toggle functionality
 * for potentially multiple sub-nav instances on the site.
 */
function setupSubNavToggle() {
    // --- Setup for Donation Pages Sub-Nav ---
    const donationToggleButton = document.getElementById('sub-nav-toggle-button'); // ID for donate pages toggle
    const donationNavMenu = document.getElementById('donation-tabs-nav');       // ID for donate pages nav

    if (donationToggleButton && donationNavMenu) {
        donationToggleButton.addEventListener('click', () => {
            const isExpanded = donationToggleButton.getAttribute('aria-expanded') === 'true';
            donationToggleButton.setAttribute('aria-expanded', !isExpanded);
            donationNavMenu.classList.toggle('open');
        });

        // Close dropdown if clicking outside
        document.addEventListener('click', (event) => {
            if (donationNavMenu.classList.contains('open') && !donationNavMenu.contains(event.target) && !donationToggleButton.contains(event.target)) {
                donationNavMenu.classList.remove('open');
                donationToggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Setup for Team Pages Sub-Nav ---
    const teamToggleButton = document.getElementById('team-sub-nav-toggle-button'); // ID for team pages toggle
    const teamNavMenu = document.getElementById('team-sub-nav-tabs');             // ID for team pages nav

    if (teamToggleButton && teamNavMenu) {
        teamToggleButton.addEventListener('click', () => {
            const isExpanded = teamToggleButton.getAttribute('aria-expanded') === 'true';
            teamToggleButton.setAttribute('aria-expanded', !isExpanded);
            teamNavMenu.classList.toggle('open');
        });

        // Close dropdown if clicking outside
        document.addEventListener('click', (event) => {
            if (teamNavMenu.classList.contains('open') && !teamNavMenu.contains(event.target) && !teamToggleButton.contains(event.target)) {
                teamNavMenu.classList.remove('open');
                teamToggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
}


    /** Helper to highlight active nav link based on filename */
    function highlightActiveNavLink() {
        // Get the filename of the current page (e.g., "index.html", "gallery.html")
        let currentPageFile = window.location.pathname.split('/').pop();
        if (currentPageFile === '' || currentPageFile === '/') {
           currentPageFile = 'index.html'; // Treat root as index.html
        }

        const navLinks = document.querySelectorAll('nav ul li a');

        navLinks.forEach(link => {
            // Get the filename from the link's href
            let linkFile = link.getAttribute('href').split('/').pop();
             if (linkFile === '' || linkFile === '/') {
                 linkFile = 'index.html';
             }

            // Remove active class first
            link.classList.remove('active');

            // Add active class if the filenames match
            if (linkFile === currentPageFile) {
                link.classList.add('active');
            }
        });
    }

}); // End DOMContentLoaded