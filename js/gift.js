// Gift Modal Module

// Open gift modal
export function openGiftModal(person) {
    const modal = document.getElementById(person + 'GiftModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close gift modal
export function closeGiftModal(person) {
    const modal = document.getElementById(person + 'GiftModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Initialize gift modals
export function initGiftModals() {
    // Expose functions globally for onclick handlers
    window.openGiftModal = openGiftModal;
    window.closeGiftModal = closeGiftModal;

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGiftModal('bride');
            closeGiftModal('groom');
        }
    });
}
