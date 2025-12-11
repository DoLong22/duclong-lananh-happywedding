// Guestbook Module
import { ref, push, onValue } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js';

let database;
let guestbookRef;

export function setDatabase(db) {
    database = db;
    guestbookRef = ref(database, 'guestbook');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Display single guestbook entry
function displayGuestbookEntry(entry) {
    const guestbookMessagesContainer = document.getElementById('guestbookMessages');
    const entryDiv = document.createElement('div');
    entryDiv.className = 'guestbook-message-card dynamic-entry';

    // Format date
    const date = new Date(entry.date);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    let timeText = '';
    if (diffMins < 60) {
        timeText = `${diffMins} phút trước`;
    } else if (diffHours < 24) {
        timeText = `${diffHours} giờ trước`;
    } else {
        timeText = `${diffDays} ngày trước`;
    }

    entryDiv.innerHTML = `
        <div class="guestbook-message-name">${escapeHtml(entry.name)}</div>
        <div class="guestbook-message-text">${escapeHtml(entry.message)}</div>
        <div class="guestbook-message-time">${timeText}</div>
    `;

    // Append to container
    guestbookMessagesContainer.appendChild(entryDiv);
}

// Auto-scroll functionality
let isAutoScrolling = true;
let autoScrollInterval;
let userScrollTimeout;
const scrollSpeed = 0.5;
const pauseDuration = 100;

// Auto scroll function with seamless loop
function startAutoScroll() {
    const guestbookMessagesContainer = document.getElementById('guestbookMessages');
    if (autoScrollInterval) return;

    autoScrollInterval = setInterval(() => {
        if (isAutoScrolling) {
            const container = guestbookMessagesContainer;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;
            const halfHeight = (scrollHeight - clientHeight) / 2;

            // Seamless loop: when reaching halfway point, reset to start
            if (container.scrollTop >= halfHeight) {
                container.scrollTop = 0;
            } else {
                container.scrollTop += scrollSpeed;
            }
        }
    }, 30);
}

// Detect user scroll
function setupScrollDetection() {
    const guestbookMessagesContainer = document.getElementById('guestbookMessages');
    let isUserScrolling = false;
    let lastScrollTop = 0;
    let scrollTimeout;

    guestbookMessagesContainer.addEventListener('scroll', () => {
        const currentScrollTop = guestbookMessagesContainer.scrollTop;

        // Only pause if scroll change is larger than auto-scroll increment
        const scrollDiff = Math.abs(currentScrollTop - lastScrollTop);

        if (scrollDiff > scrollSpeed * 2) {
            // User is scrolling manually
            isUserScrolling = true;
            isAutoScrolling = false;

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
                isAutoScrolling = true;
            }, pauseDuration);
        }

        lastScrollTop = currentScrollTop;
    }, { passive: true });

    // Detect touch events on mobile
    let touchStartY = 0;
    guestbookMessagesContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    guestbookMessagesContainer.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const diff = Math.abs(touchY - touchStartY);
        if (diff > 10) {
            isAutoScrolling = false;
            clearTimeout(userScrollTimeout);
            userScrollTimeout = setTimeout(() => {
                isAutoScrolling = true;
            }, pauseDuration);
        }
    }, { passive: true });

    // Pause on hover (desktop)
    guestbookMessagesContainer.addEventListener('mouseenter', () => {
        isAutoScrolling = false;
    });

    guestbookMessagesContainer.addEventListener('mouseleave', () => {
        if (!isUserScrolling) {
            clearTimeout(userScrollTimeout);
            userScrollTimeout = setTimeout(() => {
                isAutoScrolling = true;
            }, 500);
        }
    });
}

// Initialize guestbook
export function initGuestbook() {
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookMessagesContainer = document.getElementById('guestbookMessages');
    const guestbookMessage = document.getElementById('guestbook-message');

    // Listen for new guestbook entries from Firebase
    onValue(guestbookRef, (snapshot) => {
        // Clear all dynamic entries
        const dynamicEntries = guestbookMessagesContainer.querySelectorAll('.dynamic-entry');
        dynamicEntries.forEach(entry => entry.remove());

        // Get all entries and sort by date (newest first)
        const entries = [];
        snapshot.forEach((childSnapshot) => {
            entries.push(childSnapshot.val());
        });

        // Sort by date descending
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Show/hide empty message
        const emptyMessage = document.getElementById('emptyMessage');
        if (entries.length > 0) {
            if (emptyMessage) emptyMessage.style.display = 'none';

            // Display all entries (no duplication for minimalist style)
            entries.forEach(entry => {
                displayGuestbookEntry(entry);
            });

            // No auto-scroll for minimalist style - user will scroll manually
            // Scroll to top to show latest
            guestbookMessagesContainer.scrollTop = 0;
        } else {
            if (emptyMessage) emptyMessage.style.display = 'block';
        }
    });

    // No auto-scroll setup needed for minimalist style
    // setupScrollDetection();

    // Handle form submission
    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('guestName').value.trim();
        const message = document.getElementById('guestMessage').value.trim();

        if (name && message) {
            // Create entry object
            const entry = {
                name: name,
                message: message,
                date: new Date().toISOString()
            };

            // Push to Firebase
            push(guestbookRef, entry)
                .then(() => {
                    // Show success message
                    guestbookMessage.innerHTML = '<span class="text-green-600 font-semibold">✓ Cảm ơn bạn đã gửi lời chúc! ❤️</span>';

                    // Clear form
                    guestbookForm.reset();

                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        guestbookMessage.innerHTML = '';
                    }, 5000);
                })
                .catch((error) => {
                    console.error('Error adding entry:', error);
                    guestbookMessage.innerHTML = '<span class="text-red-600">Có lỗi xảy ra. Vui lòng thử lại!</span>';
                });
        } else {
            guestbookMessage.innerHTML = '<span class="text-red-600">Vui lòng điền đầy đủ thông tin bắt buộc!</span>';
        }
    });
}
