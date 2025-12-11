// Main JavaScript Module - Entry point
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js';

import { firebaseConfig } from './config.js';
import { initCountdown } from './countdown.js';
import { initRevealAnimations, initTimelineAnimations, initNavbarScroll } from './animations.js';
import { initGallery3D } from './gallery.js';
import { initRSVPForm, setDatabase as setRSVPDatabase } from './rsvp.js';
import { initGuestbook, setDatabase as setGuestbookDatabase } from './guestbook.js';
import { initGiftModals } from './gift.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Set database for modules that need it
setRSVPDatabase(database);
setGuestbookDatabase(database);

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navbar scroll effect
    initNavbarScroll();

    // Initialize reveal animations
    initRevealAnimations();

    // Initialize timeline animations
    initTimelineAnimations();

    // Initialize countdown
    initCountdown();

    // Initialize RSVP form
    initRSVPForm();

    // Initialize guestbook
    initGuestbook();

    // Initialize gift modals
    initGiftModals();
});

// Initialize gallery when page is fully loaded
window.addEventListener('load', () => {
    initGallery3D();
});
