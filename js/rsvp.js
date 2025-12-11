// RSVP Form Module
import { ref, push } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js';

let database;

export function setDatabase(db) {
    database = db;
}

// Confetti function - Shooting from bottom corners with random angles and physics
function createConfetti() {
    const colors = ['#5F7A71', '#A8B896', '#C4D4B8', '#FFD700', '#FF69B4', '#87CEEB', '#98D8C8', '#F7DC6F', '#E8DED0'];
    const confettiCount = 120; // 60 from each side

    // Function to create single confetti
    function shootConfetti(fromLeft) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Position at corner
        if (fromLeft) {
            confetti.style.left = '5%';
            confetti.style.bottom = '0';
        } else {
            confetti.style.right = '5%';
            confetti.style.bottom = '0';
        }

        // Random color
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random size
        const size = Math.random() * 10 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';

        // Random shape (square, circle, or rectangle)
        const shapeRand = Math.random();
        if (shapeRand > 0.66) {
            confetti.style.borderRadius = '50%';
        } else if (shapeRand > 0.33) {
            confetti.style.borderRadius = '2px';
        }

        // Physics-based trajectory with random angle
        const baseAngle = fromLeft ? 45 : 135;
        const angleVariation = (Math.random() - 0.5) * 40;
        const angle = baseAngle + angleVariation;
        const angleRad = angle * Math.PI / 180;

        // Random velocity
        const velocity = 100 + Math.random() * 50;

        // Calculate trajectory with gravity effect
        const initialVx = Math.cos(angleRad) * velocity;
        const initialVy = Math.sin(angleRad) * velocity;

        // Add gravity effect
        const gravity = 20;
        const tx = initialVx;
        const ty = -initialVy + gravity;

        // Random rotation
        const rotation = (Math.random() - 0.5) * 1440;

        // Set CSS variables for animation
        confetti.style.setProperty('--tx', tx + 'vw');
        confetti.style.setProperty('--ty', ty + 'vh');
        confetti.style.setProperty('--rotate', rotation + 'deg');

        // Animation duration
        const duration = 3 + Math.random() * 2;
        confetti.style.animation = `confetti-physics ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;

        document.body.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), duration * 1000);
    }

    // Shoot from left corner
    for (let i = 0; i < confettiCount / 2; i++) {
        setTimeout(() => {
            shootConfetti(true);
        }, i * 50);
    }

    // Shoot from right corner
    for (let i = 0; i < confettiCount / 2; i++) {
        setTimeout(() => {
            shootConfetti(false);
        }, i * 50);
    }
}

// Show success message
function showSuccessMessage(name, attendance) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';

    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';

    let message = '';
    if (attendance === 'yes') {
        message = `
            <div class="success-icon">🎉</div>
            <h3 class="success-title">Cảm ơn ${name}!</h3>
            <div class="decorative-line"></div>
            <p class="success-text">
                Sự hiện diện của bạn là niềm vui lớn nhất đối với chúng tôi.<br>
                Cảm ơn bạn đã dành thời gian quý báu để đồng hành cùng chúng tôi<br>
                trong ngày trọng đại này.
            </p>
            <p class="success-text" style="font-weight: 600; color: #5F7A71;">
                Hẹn gặp bạn vào ngày 28.12.2025! 💝
            </p>
            <p class="success-quote">
                "Hạnh phúc được nhân đôi khi có bạn bên cạnh"
            </p>
            <button class="success-close-btn" onclick="closeSuccessMessage()">Tuyệt vời! 🎉</button>
        `;
    } else {
        message = `
            <div class="success-icon">💐</div>
            <h3 class="success-title">Cảm ơn ${name}!</h3>
            <div class="decorative-line"></div>
            <p class="success-text">
                Chúng tôi rất trân trọng sự quan tâm của bạn.<br>
                Dù không thể có mặt, tình cảm của bạn vẫn luôn<br>
                là một phần trong ngày đặc biệt của chúng tôi.
            </p>
            <p class="success-text" style="font-weight: 600; color: #5F7A71;">
                Chúng tôi sẽ nhớ đến bạn! 💝
            </p>
            <p class="success-quote">
                "Dù xa hay gần, tình bạn vẫn mãi trong tim"
            </p>
            <button class="success-close-btn" onclick="closeSuccessMessage()">Cảm ơn bạn! 💝</button>
        `;
    }

    messageDiv.innerHTML = message;
    overlay.appendChild(messageDiv);
    document.body.appendChild(overlay);

    // Trigger confetti
    if (attendance === 'yes') {
        createConfetti();
    }

    // Store reference for closing
    window.currentSuccessOverlay = overlay;
}

// Close success message function
window.closeSuccessMessage = function() {
    const overlay = window.currentSuccessOverlay;
    if (overlay) {
        overlay.classList.add('fade-out');
        const messageDiv = overlay.querySelector('.success-message');
        if (messageDiv) {
            messageDiv.classList.add('fade-out');
        }
        setTimeout(() => {
            overlay.remove();
            window.currentSuccessOverlay = null;
        }, 400);
    }
}

// Initialize RSVP form
export function initRSVPForm() {
    const rsvpForm = document.getElementById('rsvp-form');
    const attendanceDetails = document.getElementById('attendance-details');
    const declineMessage = document.getElementById('decline-message');
    const pickupLocationContainer = document.getElementById('pickup-location-container');
    const phoneInput = document.getElementById('phone');
    const phoneRequired = document.getElementById('phone-required');

    // Show/hide details based on attendance
    document.querySelectorAll('input[name="attendance"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                attendanceDetails.style.display = 'block';
                declineMessage.style.display = 'none';

                // Add required attribute back to fields that need it
                document.getElementById('guest-count').required = true;
                document.querySelectorAll('input[name="transport"]').forEach(input => {
                    input.required = true;
                });
            } else if (this.value === 'no') {
                attendanceDetails.style.display = 'none';
                declineMessage.style.display = 'block';

                // Remove required attribute from all fields in attendance-details
                document.getElementById('phone').required = false;
                document.getElementById('guest-count').required = false;
                document.getElementById('pickup-location').required = false;
                document.querySelectorAll('input[name="transport"]').forEach(input => {
                    input.required = false;
                });
            }
        });
    });

    // Show/hide pickup location based on transport method
    document.querySelectorAll('input[name="transport"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'group') {
                pickupLocationContainer.style.display = 'block';
                phoneInput.required = true;
                phoneRequired.style.display = 'inline';
            } else {
                pickupLocationContainer.style.display = 'none';
                phoneInput.required = false;
                phoneRequired.style.display = 'none';
            }
        });
    });

    // Form submission
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const guestSide = document.querySelector('input[name="guest-side"]:checked')?.value;
        const attendance = document.querySelector('input[name="attendance"]:checked')?.value;

        // Validate required radio buttons
        if (!guestSide) {
            document.getElementById('form-message').innerHTML = '<span class="text-red-300">Vui lòng chọn khách mời của nhà ai!</span>';
            return;
        }

        if (!attendance) {
            document.getElementById('form-message').innerHTML = '<span class="text-red-300">Vui lòng chọn có tham dự hay không!</span>';
            return;
        }

        // Basic RSVP data
        const rsvpData = {
            name: name,
            guestSide: guestSide,
            attendance: attendance,
            timestamp: new Date().toISOString()
        };

        // Add additional fields if attending
        if (attendance === 'yes') {
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const guestCount = document.getElementById('guest-count').value;
            const transport = document.querySelector('input[name="transport"]:checked')?.value;
            const note = document.getElementById('note').value.trim();

            rsvpData.phone = phone;
            rsvpData.email = email;
            rsvpData.guestCount = parseInt(guestCount);
            rsvpData.transport = transport;
            rsvpData.note = note;

            // Validate transport selection
            if (!transport) {
                document.getElementById('form-message').innerHTML = '<span class="text-red-300">Vui lòng chọn phương thức di chuyển!</span>';
                return;
            }

            if (transport === 'group') {
                const pickupLocation = document.getElementById('pickup-location').value;
                rsvpData.pickupLocation = pickupLocation;

                // Validate phone if going with group
                if (!phone) {
                    document.getElementById('form-message').innerHTML = '<span class="text-red-300">Vui lòng nhập số điện thoại nếu đi cùng đoàn!</span>';
                    return;
                }

                // Validate pickup location
                if (!pickupLocation) {
                    document.getElementById('form-message').innerHTML = '<span class="text-red-300">Vui lòng chọn điểm đón!</span>';
                    return;
                }
            }
        }

        // Save to Firebase
        const rsvpRef = ref(database, 'rsvp');
        push(rsvpRef, rsvpData)
            .then(() => {
                // Show success message with confetti
                showSuccessMessage(name, attendance);

                // Clear any error messages
                document.getElementById('form-message').innerHTML = '';

                // Reset form
                rsvpForm.reset();
                attendanceDetails.style.display = 'none';
                declineMessage.style.display = 'none';
                pickupLocationContainer.style.display = 'none';
            })
            .catch((error) => {
                console.error('Error saving RSVP:', error);
                document.getElementById('form-message').innerHTML = '<span class="text-red-300">Có lỗi xảy ra. Vui lòng thử lại!</span>';
            });
    });
}
