/* ========================================
   NAVIGATION INTERACTIVITY
   - Scroll behavior: transparent → solid
   - Active link indicator
   - Smooth scroll
======================================== */

(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // ========================================
    // 1. SCROLL BEHAVIOR
    // Add 'scrolled' class when page scrolls down
    // ========================================
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Throttle scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleScroll();
                scrollTimeout = null;
            }, 10);
        }
    });

    // Initial check on page load
    handleScroll();

    // ========================================
    // 2. ACTIVE LINK INDICATOR
    // Highlight current section link based on scroll position
    // ========================================
    function updateActiveLink() {
        // Get all sections
        const sections = document.querySelectorAll('section[id]');

        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for better UX

        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');

            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll listener for active link
    let activeLinkTimeout;
    window.addEventListener('scroll', function() {
        if (!activeLinkTimeout) {
            activeLinkTimeout = setTimeout(function() {
                updateActiveLink();
                activeLinkTimeout = null;
            }, 100);
        }
    });

    // Initial check on page load
    updateActiveLink();

    // ========================================
    // 3. SMOOTH SCROLL WITH OFFSET
    // Handle clicks on nav links for smooth scrolling
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Calculate offset for fixed navbar
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;

                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });

    // ========================================
    // 4. MOBILE: CLOSE MENU ON LINK CLICK (if needed)
    // Currently not using hamburger, but ready for future
    // ========================================
    // Reserved for future mobile menu implementation

})();
