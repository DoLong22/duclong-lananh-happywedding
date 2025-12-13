/**
 * Wedding Invitation Personalization
 * Reads guest name and venue from URL parameter and personalizes the invitation
 */

import { URLParamsEncoder } from './url-params.js';

export class PersonalizationManager {
    constructor() {
        const params = this.getParamsFromUrl();
        this.guestName = params ? params.guest : null;
        this.venue = params ? params.venue : 'groom';
        this.initialize();
    }

    /**
     * Get parameters from URL (guest name and venue)
     */
    getParamsFromUrl() {
        return URLParamsEncoder.getParamsFromUrl();
    }

    /**
     * Initialize personalization
     */
    initialize() {
        if (this.guestName) {
            console.log('🎉 Personalizing for guest:', this.guestName, '| Venue:', this.venue);
            this.personalizeInvitation();
            this.prefillGuestbook();
            this.prefillRSVP();

            // Store guest info in sessionStorage for consistency
            sessionStorage.setItem('guestName', this.guestName);
            sessionStorage.setItem('venue', this.venue);

            // Apply venue-specific customizations
            this.applyVenueCustomizations();
        } else {
            console.log('ℹ️ No guest parameter found, using default text');
            this.useDefaultText();

            // Check if we have URL params but failed to decode (likely in-app browser issue)
            this.checkInAppBrowserIssue();
        }
    }

    /**
     * Check if there's a decode issue in in-app browser and show notification
     */
    checkInAppBrowserIssue() {
        const urlParams = new URLSearchParams(window.location.search);
        const hasDataParam = urlParams.has('data');
        const isInAppBrowser = URLParamsEncoder.isInAppBrowser();

        if (hasDataParam && !this.guestName && isInAppBrowser) {
            console.warn('⚠️ In-app browser detected with decode failure');
            this.showInAppBrowserNotification();
        }
    }

    /**
     * Show notification for in-app browser users to open in real browser
     */
    showInAppBrowserNotification() {
        const banner = document.createElement('div');
        banner.id = 'in-app-browser-banner';
        banner.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
                color: white;
                padding: 12px 20px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                font-size: 14px;
                line-height: 1.5;
            ">
                <div style="max-width: 600px; margin: 0 auto;">
                    <strong>📱 Vui lòng mở trong trình duyệt</strong><br>
                    <span style="font-size: 12px;">Nhấn vào menu (⋯) và chọn "Mở trong trình duyệt" để xem thiệp cá nhân hóa</span>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    position: absolute;
                    top: 50%;
                    right: 15px;
                    transform: translateY(-50%);
                    background: rgba(255,255,255,0.3);
                    border: none;
                    color: white;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                    line-height: 1;
                ">×</button>
            </div>
        `;

        document.body.insertBefore(banner, document.body.firstChild);

        // Add padding to body to prevent content from being hidden
        document.body.style.paddingTop = '80px';

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (banner.parentElement) {
                banner.remove();
                document.body.style.paddingTop = '0';
            }
        }, 10000);
    }

    /**
     * Apply venue-specific customizations
     */
    applyVenueCustomizations() {
        if (this.venue === 'bride') {
            console.log('🏠 Applying bride venue customizations');
            // Hide timeline and dress code sections
            this.hideTimelineAndDressCode();
            // Update wedding details for bride venue
            this.updateBrideVenueDetails();
        }
    }

    /**
     * Update wedding details for bride venue
     */
    updateBrideVenueDetails() {
        setTimeout(() => {
            // Update venue name
            const venueName = document.getElementById('venue-name');
            if (venueName) {
                venueName.textContent = 'Tư Gia Nhà Gái';
                console.log('✅ Updated venue name for bride venue');
            }

            // Update venue address
            const venueAddress = document.getElementById('venue-address');
            if (venueAddress) {
                venueAddress.textContent = 'Thôn Hậu Trung 1, xã Tiên Hưng, Tỉnh Hưng Yên';
                console.log('✅ Updated venue address for bride venue');
            }

            // Update venue address link
            const venueAddressLink = document.getElementById('venue-address-link');
            if (venueAddressLink) {
                venueAddressLink.href = 'https://maps.app.goo.gl/fehkYR5PBTGWSrtt7';
                console.log('✅ Updated venue map link for bride venue');
            }

            // Update event time
            const eventTime = document.getElementById('event-time');
            if (eventTime) {
                eventTime.textContent = '18:00';
                console.log('✅ Updated event time for bride venue');
            }

            // Update event day
            const eventDay = document.getElementById('event-day');
            if (eventDay) {
                eventDay.textContent = 'THỨ BẢY';
                console.log('✅ Updated event day for bride venue');
            }

            // Update event date
            const eventDate = document.getElementById('event-date');
            if (eventDate) {
                eventDate.textContent = '27.12.2025';
                console.log('✅ Updated event date for bride venue');
            }
        }, 100);
    }

    /**
     * Hide timeline and dress code sections for bride venue
     */
    hideTimelineAndDressCode() {
        // Wait for DOM to be ready
        setTimeout(() => {
            const timelineSection = document.getElementById('timeline-section');
            const dressCodeSection = document.getElementById('dress-code-section');

            if (timelineSection) {
                timelineSection.style.display = 'none';
                console.log('✅ Hidden timeline section for bride venue');
            }

            if (dressCodeSection) {
                dressCodeSection.style.display = 'none';
                console.log('✅ Hidden dress code section for bride venue');
            }
        }, 100);
    }

    /**
     * Personalize the invitation subtitle
     */
    personalizeInvitation() {
        const subtitleElement = document.querySelector('.invitation-guestname');

        if (subtitleElement) {
            subtitleElement.textContent = this.guestName;
        }
    }

    /**
     * Set default invitation text when no guest parameter
     */
    useDefaultText() {
        const subtitleElement = document.querySelector('.invitation-guestname');

        if (subtitleElement) {
            subtitleElement.textContent = 'Khách Quý';
        }
    }

    /**
     * Pre-fill guestbook form with guest name
     */
    prefillGuestbook() {
        // Wait for DOM to be ready
        setTimeout(() => {
            const guestbookNameInput = document.getElementById('guestName');

            if (guestbookNameInput && !guestbookNameInput.value) {
                guestbookNameInput.value = this.guestName;
                guestbookNameInput.setAttribute('readonly', 'true');
                guestbookNameInput.style.backgroundColor = '#f5f5f5';

                console.log('✅ Pre-filled guestbook with:', this.guestName);
            }
        }, 500);
    }

    /**
     * Pre-fill RSVP form with guest name
     */
    prefillRSVP() {
        // Wait for DOM to be ready
        setTimeout(() => {
            const rsvpNameInput = document.getElementById('name');

            if (rsvpNameInput && !rsvpNameInput.value) {
                rsvpNameInput.value = this.guestName;
                rsvpNameInput.setAttribute('readonly', 'true');
                rsvpNameInput.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                rsvpNameInput.style.cursor = 'not-allowed';

                console.log('✅ Pre-filled RSVP with:', this.guestName);
            }
        }, 500);
    }

    /**
     * Get current guest name (public method)
     */
    getGuestName() {
        return this.guestName;
    }

    /**
     * Get current venue (public method)
     */
    getVenue() {
        return this.venue;
    }

    /**
     * Check if page is personalized
     */
    isPersonalized() {
        return this.guestName !== null;
    }

    /**
     * Check if this is bride venue
     */
    isBrideVenue() {
        return this.venue === 'bride';
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.personalizationManager = new PersonalizationManager();
    });
} else {
    window.personalizationManager = new PersonalizationManager();
}
