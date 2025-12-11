// Animation Module - Reveal animations and effects

export function initRevealAnimations() {
    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

export function initTimelineAnimations() {
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Add initial reveal to first timeline item after page load
    window.addEventListener('load', () => {
        const firstTimelineItem = document.querySelector('.timeline-item');
        if (firstTimelineItem) {
            setTimeout(() => {
                firstTimelineItem.classList.add('reveal');
            }, 300);
        }
    });
}

export function initNavbarScroll() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.onscroll = function () {
        if (window.pageYOffset > 100) {
            navbar.classList.add("bg-white/10", "backdrop-blur-sm");
        } else {
            navbar.classList.remove("bg-white/10", "backdrop-blur-sm");
        }
    };
}

// Floating hearts animation
export function createFloatingHeart(e) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
}
