// Hero Images Carousel for Mobile
// Vanilla JavaScript carousel with improved touch support, auto-play, and infinite loop

class HeroCarousel {
    constructor() {
        this.carousel = document.querySelector('.hero-images-carousel');
        if (!this.carousel) return;

        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = Array.from(this.track.querySelectorAll('.carousel-slide'));
        this.indicators = Array.from(this.carousel.querySelectorAll('.indicator'));

        this.currentIndex = 0;

        // Touch/drag tracking
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.isDragging = false;
        this.swipeDirection = null; // 'horizontal', 'vertical', or null

        // Auto-play settings
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 seconds
        this.hasUserInteracted = false;

        // Check if user prefers reduced motion
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.init();
    }

    init() {
        // Set initial active states
        this.updateCarousel(false);

        // Touch events with better handling
        // Use passive: true for touchstart to improve scroll performance
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        // touchmove needs passive: false only to allow conditional preventDefault
        this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        this.track.addEventListener('touchcancel', (e) => this.handleTouchCancel(e), { passive: true });

        // Mouse events (for desktop testing)
        this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.track.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.track.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.track.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));

        // Indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.pauseAutoPlay();
                this.hasUserInteracted = true;
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Start auto-play
        this.startAutoPlay();

        // Pause auto-play when page is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else if (!this.hasUserInteracted) {
                this.startAutoPlay();
            }
        });
    }

    handleTouchStart(e) {
        // Only track single touch
        if (e.touches.length !== 1) return;

        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.currentX = this.startX;
        this.currentY = this.startY;
        this.isDragging = true;
        this.swipeDirection = null; // Reset swipe direction
        this.pauseAutoPlay();
    }

    handleTouchMove(e) {
        if (!this.isDragging || e.touches.length !== 1) return;

        this.currentX = e.touches[0].clientX;
        this.currentY = e.touches[0].clientY;

        const diffX = this.currentX - this.startX;
        const diffY = this.currentY - this.startY;

        // Determine swipe direction if not already determined
        if (this.swipeDirection === null) {
            const absX = Math.abs(diffX);
            const absY = Math.abs(diffY);

            // Need at least 10px movement to determine direction
            if (absX > 10 || absY > 10) {
                // Determine if this is primarily horizontal or vertical movement
                if (absX > absY * 1.5) {
                    // Horizontal swipe (X movement is significantly larger than Y)
                    this.swipeDirection = 'horizontal';
                } else {
                    // Vertical swipe or ambiguous - allow default scroll behavior
                    this.swipeDirection = 'vertical';
                }
            }
        }

        // Only prevent default scrolling if this is a horizontal swipe
        if (this.swipeDirection === 'horizontal') {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
        if (!this.isDragging) return;

        const diffX = this.currentX - this.startX;
        const diffY = this.currentY - this.startY;
        const threshold = 50; // Minimum swipe distance in pixels

        // Only process as a swipe if it was horizontal movement
        if (this.swipeDirection === 'horizontal' && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe right - go to previous
                this.prevSlide();
            } else {
                // Swipe left - go to next
                this.nextSlide();
            }
            this.hasUserInteracted = true;
        }

        this.resetDragState();
    }

    handleTouchCancel(e) {
        // Reset state if touch is cancelled
        this.resetDragState();
    }

    resetDragState() {
        this.isDragging = false;
        this.swipeDirection = null;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
    }

    handleMouseDown(e) {
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.currentX = this.startX;
        this.currentY = this.startY;
        this.isDragging = true;
        this.swipeDirection = 'horizontal'; // Mouse drags are always for carousel
        this.pauseAutoPlay();
        e.preventDefault();
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.clientX;
        this.currentY = e.clientY;
    }

    handleMouseUp(e) {
        if (!this.isDragging) return;

        const diff = this.currentX - this.startX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
            this.hasUserInteracted = true;
        }

        this.resetDragState();
    }

    handleMouseLeave(e) {
        if (this.isDragging) {
            this.resetDragState();
        }
    }

    handleKeyboard(e) {
        // Only handle keyboard when carousel is visible (mobile view)
        if (window.innerWidth > 768) return;

        if (e.key === 'ArrowLeft') {
            this.prevSlide();
            this.pauseAutoPlay();
            this.hasUserInteracted = true;
        } else if (e.key === 'ArrowRight') {
            this.nextSlide();
            this.pauseAutoPlay();
            this.hasUserInteracted = true;
        }
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel(animate = true) {
        const offset = -this.currentIndex * 100;

        if (this.prefersReducedMotion || !animate) {
            // No transition for reduced motion preference or initial load
            this.track.style.transition = 'none';
        } else {
            this.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }

        this.track.style.transform = `translateX(${offset}%)`;

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });

        // Update aria-live region for screen readers
        const currentSlideNumber = this.currentIndex + 1;
        this.carousel.setAttribute('aria-label', `Image ${currentSlideNumber} of ${this.slides.length}`);
    }

    startAutoPlay() {
        // Don't start auto-play if user has interacted or prefers reduced motion
        if (this.hasUserInteracted || this.prefersReducedMotion) return;

        this.pauseAutoPlay(); // Clear any existing interval

        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new HeroCarousel();
    });
} else {
    new HeroCarousel();
}
