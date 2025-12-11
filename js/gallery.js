// 3D Gallery Carousel Module

// Album Photos
const albumPhotos = [
    'album/ACN09294.JPG',
    'album/ACN00005.jpg',
    'album/ACN00058.jpg',
    'album/ACN00124.jpg',
    'album/ACN00147.jpg',
    'album/ACN00163.jpg',
    'album/ACN00211.jpg',
    'album/ACN00267.jpg',
    'album/ACN00312.jpg',
    'album/ACN00337.jpg',
    'album/ACN09129.jpg',
    'album/ACN09152.jpg',
    'album/ACN09161.jpg',
    'album/ACN09176.jpg',
    'album/ACN09216.jpg',
    'album/ACN09243.jpg',
    'album/ACN09251.jpg',
    'album/ACN09269.jpg',
    'album/ACN09273.jpg',
    'album/ACN09334.jpg',
    'album/ACN09349.jpg',
    'album/ACN09365.jpg',
    'album/ACN09444.jpg',
    'album/ACN09456.jpg',
    'album/co-dau.jpg',
    'album/ACN09575.JPG',
    'album/ACN09609.jpg',
    'album/ACN09680.jpg',
    'album/ACN09685.jpg',
    'album/ACN09715.jpg',
    'album/ACN09739.jpg',
    'album/ACN09758.jpg',
    'album/ACN09788.jpg',
    'album/chu-re.jpg',
    'album/ACN09974.jpg'
];

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array]; // Create a copy
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Shuffle photos on load
const shuffledPhotos = shuffleArray(albumPhotos);

let galleryCurrentIndex = 0;
let galleryAutoRotateInterval;
let galleryCarousel;
let galleryThumbnailsContainer;
let galleryTotalSlidesElement;
let galleryCurrentSlideElement;

// Update carousel position
function updateGalleryCarousel() {
    const angleIncrement = 360 / shuffledPhotos.length;
    const galleryItems = document.querySelectorAll('.gallery-3d-item');
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');

    // Responsive radius based on screen width
    let radius;
    if (window.innerWidth > 1024) {
        radius = 550;
    } else if (window.innerWidth > 768) {
        radius = 480;
    } else if (window.innerWidth > 600) {
        radius = 400;
    } else if (window.innerWidth > 480) {
        radius = 340;
    } else if (window.innerWidth > 375) {
        radius = 280;
    } else {
        radius = 250;
    }

    // Only show 3 images: 1 active + 1 on each side
    const visibleRange = 1;

    galleryItems.forEach((item, index) => {
        // Calculate distance from current index (handle wrap around)
        let distance = index - galleryCurrentIndex;
        if (distance > shuffledPhotos.length / 2) {
            distance -= shuffledPhotos.length;
        } else if (distance < -shuffledPhotos.length / 2) {
            distance += shuffledPhotos.length;
        }

        // Only show images within range
        if (Math.abs(distance) > visibleRange) {
            item.style.display = 'none';
            return;
        }

        item.style.display = 'block';

        const angle = angleIncrement * (index - galleryCurrentIndex);
        const radian = (angle * Math.PI) / 180;

        // Calculate 3D position
        let x = Math.sin(radian) * radius;
        const z = Math.cos(radian) * radius - radius;
        let scale = 1 - Math.abs(z) / (radius * 2.5);
        const opacity = scale;

        // Move side images further away and rotate towards center
        let rotateY = 0;
        if (index !== galleryCurrentIndex) {
            // Increase x distance more to avoid overlap with larger center image
            x = x * 2.5;

            // Add more padding to separate completely
            if (distance < 0) {
                x = x - 20; // Push left image further left
            } else {
                x = x + 20; // Push right image further right
            }

            // Scale side images to 75% of main image
            scale = scale * 0.75;

            // Rotate images towards center
            if (distance < 0) {
                rotateY = 20; // Left image rotates right
            } else {
                rotateY = -20; // Right image rotates left
            }
        } else {
            // Make center image 30% larger
            scale = scale * 1.3;
        }

        item.style.transform = `
            translateX(${x}px)
            translateZ(${z}px)
            scale(${scale})
            rotateY(${rotateY}deg)
        `;
        item.style.opacity = opacity;

        // Ensure center image has highest z-index
        if (index === galleryCurrentIndex) {
            item.style.zIndex = 1000;
        } else {
            item.style.zIndex = Math.round(scale * 100);
        }

        // Mark active item (in center)
        if (index === galleryCurrentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update thumbnails
    galleryThumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === galleryCurrentIndex);
    });

    // Update counter
    galleryCurrentSlideElement.textContent = galleryCurrentIndex + 1;

    // Scroll thumbnail into view (only within container, don't scroll entire page)
    if (galleryThumbnails[galleryCurrentIndex] && galleryThumbnailsContainer) {
        const thumbnail = galleryThumbnails[galleryCurrentIndex];
        const container = galleryThumbnailsContainer;

        // Calculate position and scroll only within container
        const thumbLeft = thumbnail.offsetLeft;
        const thumbWidth = thumbnail.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);

        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
}

// Rotate gallery
function rotateGallery(direction) {
    galleryCurrentIndex += direction;

    if (galleryCurrentIndex < 0) galleryCurrentIndex = shuffledPhotos.length - 1;
    if (galleryCurrentIndex >= shuffledPhotos.length) galleryCurrentIndex = 0;

    updateGalleryCarousel();
    resetGalleryAutoRotate();
}

// Go to specific slide
function goToGallerySlide(index) {
    galleryCurrentIndex = index;
    updateGalleryCarousel();
    resetGalleryAutoRotate();
}

// Auto-rotate functions
function startGalleryAutoRotate() {
    galleryAutoRotateInterval = setInterval(() => rotateGallery(1), 4000);
}

function stopGalleryAutoRotate() {
    clearInterval(galleryAutoRotateInterval);
}

function resetGalleryAutoRotate() {
    stopGalleryAutoRotate();
    startGalleryAutoRotate();
}

// Initialize gallery
export function initGallery3D() {
    galleryCarousel = document.getElementById('gallery3DCarousel');
    galleryThumbnailsContainer = document.getElementById('galleryThumbnails');
    galleryTotalSlidesElement = document.getElementById('galleryTotalSlides');
    galleryCurrentSlideElement = document.getElementById('galleryCurrentSlide');

    if (!galleryCarousel || !galleryThumbnailsContainer) return;

    galleryTotalSlidesElement.textContent = shuffledPhotos.length;

    // Create carousel items
    shuffledPhotos.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-3d-item';
        if (index === 0) item.classList.add('active');

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Wedding ${index + 1}`;
        img.loading = index < 5 ? 'eager' : 'lazy';

        item.appendChild(img);
        item.onclick = () => goToGallerySlide(index);
        galleryCarousel.appendChild(item);

        // Create thumbnails
        const thumb = document.createElement('div');
        thumb.className = 'gallery-thumbnail';
        if (index === 0) thumb.classList.add('active');

        const thumbImg = document.createElement('img');
        thumbImg.src = src;
        thumbImg.alt = `Thumbnail ${index + 1}`;

        thumb.appendChild(thumbImg);
        thumb.onclick = () => goToGallerySlide(index);
        galleryThumbnailsContainer.appendChild(thumb);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const isTyping = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
        if (!isTyping && e.key === 'ArrowLeft') rotateGallery(-1);
        if (!isTyping && e.key === 'ArrowRight') rotateGallery(1);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    galleryCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGallerySwipe();
    });

    function handleGallerySwipe() {
        const swipeThreshold = window.innerWidth < 480 ? 30 : 50;
        if (touchEndX < touchStartX - swipeThreshold) rotateGallery(1);
        if (touchEndX > touchStartX + swipeThreshold) rotateGallery(-1);
    }

    // Pause auto-rotate on interaction
    galleryCarousel.addEventListener('click', () => {
        clearInterval(galleryAutoRotateInterval);
    });

    // Stop auto-rotate when scrolling out of Gallery section
    const gallerySection = document.getElementById('gallery');
    const observerOptions = {
        root: null,
        threshold: 0.3 // When 30% gallery visible
    };

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                stopGalleryAutoRotate();
            } else {
                resetGalleryAutoRotate();
            }
        });
    }, observerOptions);

    if (gallerySection) {
        galleryObserver.observe(gallerySection);
    }

    // Responsive: update on resize
    window.addEventListener('resize', updateGalleryCarousel);

    // Initialize
    updateGalleryCarousel();
    startGalleryAutoRotate();

    // Expose functions globally for onclick handlers
    window.rotateGallery = rotateGallery;
    window.goToGallerySlide = goToGallerySlide;
}
