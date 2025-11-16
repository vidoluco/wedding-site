// Hero Images Carousel for Mobile
// Vanilla JavaScript carousel with touch support, auto-play, and infinite loop

class HeroCarousel {
    constructor() {
        this.carousel = document.querySelector('.hero-images-carousel');
        if (!this.carousel) return;

        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = Array.from(this.track.querySelectorAll('.carousel-slide'));
        this.indicators = [];

        this.currentIndex = 0;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
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

        // Touch events
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Mouse events (for desktop testing)
        this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.track.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.track.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.track.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));

        // Indicator click events (only if indicators exist)
        if (this.indicators.length > 0) {
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    this.goToSlide(index);
                    this.pauseAutoPlay();
                    this.hasUserInteracted = true;
                });
            });
        }

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
        this.startX = e.touches[0].clientX;
        this.currentX = this.startX;
        this.isDragging = true;
        this.pauseAutoPlay();
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;

        this.currentX = e.touches[0].clientX;
        const diff = this.currentX - this.startX;

        // Prevent default to stop scrolling while swiping
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
        if (!this.isDragging) return;

        const diff = this.currentX - this.startX;
        const threshold = 50; // Minimum swipe distance in pixels

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe right - go to previous
                this.prevSlide();
            } else {
                // Swipe left - go to next
                this.nextSlide();
            }
            this.hasUserInteracted = true;
        }

        this.isDragging = false;

        // Resume auto-play if user hasn't interacted extensively
        if (!this.hasUserInteracted) {
            this.startAutoPlay();
        }
    }

    handleMouseDown(e) {
        this.startX = e.clientX;
        this.currentX = this.startX;
        this.isDragging = true;
        this.pauseAutoPlay();
        e.preventDefault();
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.clientX;
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

        this.isDragging = false;
    }

    handleMouseLeave(e) {
        if (this.isDragging) {
            this.isDragging = false;
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

        // Update indicators (only if they exist)
        if (this.indicators.length > 0) {
            this.indicators.forEach((indicator, index) => {
                if (index === this.currentIndex) {
                    indicator.classList.add('active');
                    indicator.setAttribute('aria-current', 'true');
                } else {
                    indicator.classList.remove('active');
                    indicator.removeAttribute('aria-current');
                }
            });
        }

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
