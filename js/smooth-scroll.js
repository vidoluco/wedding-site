/**
 * SMOOTH SCROLLING FUNCTIONALITY
 * Enhanced smooth scrolling with easing and offset calculations
 */

// =============================================================================
// SMOOTH SCROLL IMPLEMENTATION
// =============================================================================

class SmoothScroll {
    constructor(options = {}) {
        this.options = {
            duration: 800,
            easing: 'easeInOutCubic',
            offset: 80, // Account for fixed navbar
            ...options
        };

        this.init();
    }

    init() {
        // Handle all anchor links that start with #
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollTo(targetId);
            }
        });

        // Handle navigation links specifically
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollTo(targetId);

                // Close mobile menu if open
                this.closeMobileMenu();

                // Update active navigation state
                this.updateActiveNav(link);
            });
        });

        // Update active navigation on scroll
        this.handleScrollSpy();
    }

    scrollTo(targetId, customOptions = {}) {
        const target = document.querySelector(targetId);
        if (!target) {
            console.warn(`Target element ${targetId} not found`);
            return;
        }

        const options = { ...this.options, ...customOptions };
        const startPosition = window.pageYOffset;
        const targetPosition = target.offsetTop - options.offset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / options.duration, 1);

            const easedProgress = this.easing[options.easing](progress);
            const currentPosition = startPosition + (distance * easedProgress);

            window.scrollTo(0, currentPosition);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                // Scroll completed
                this.onScrollComplete(target);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    closeMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    updateActiveNav(activeLink) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    handleScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        if (sections.length === 0) return;

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                    if (correspondingLink) {
                        this.updateActiveNav(correspondingLink);
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    onScrollComplete(target) {
        // Focus the target for accessibility
        target.tabIndex = -1;
        target.focus();

        // Dispatch custom event
        const event = new CustomEvent('smoothScrollComplete', {
            detail: { target }
        });
        document.dispatchEvent(event);
    }

    // Easing functions
    easing = {
        linear: (t) => t,

        easeInQuad: (t) => t * t,
        easeOutQuad: (t) => t * (2 - t),
        easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

        easeInCubic: (t) => t * t * t,
        easeOutCubic: (t) => (--t) * t * t + 1,
        easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

        easeInQuart: (t) => t * t * t * t,
        easeOutQuart: (t) => 1 - (--t) * t * t * t,
        easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,

        easeInQuint: (t) => t * t * t * t * t,
        easeOutQuint: (t) => 1 + (--t) * t * t * t * t,
        easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    };
}

// =============================================================================
// ENHANCED SCROLL FEATURES
// =============================================================================

class ScrollToTop {
    constructor() {
        this.button = null;
        this.init();
    }

    init() {
        this.createButton();
        this.handleScroll();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.innerHTML = '↑';
        this.button.className = 'scroll-to-top';
        this.button.setAttribute('aria-label', 'Scroll to top');
        this.button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--button-bg);
            color: white;
            border: none;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(this.button);
    }

    handleScroll() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                    if (scrollTop > 300) {
                        this.button.style.opacity = '1';
                        this.button.style.transform = 'translateY(0)';
                    } else {
                        this.button.style.opacity = '0';
                        this.button.style.transform = 'translateY(20px)';
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

// =============================================================================
// SCROLL ANIMATIONS TRIGGER
// =============================================================================

class ScrollAnimations {
    constructor() {
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.triggerAnimation(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);

        // Observe elements with animation classes
        const elementsToAnimate = document.querySelectorAll(`
            .fade-in,
            .fade-in-left,
            .fade-in-right,
            .scale-in,
            .slide-up,
            .slide-down,
            .section-transition
        `);

        elementsToAnimate.forEach(el => observer.observe(el));
    }

    triggerAnimation(element) {
        element.classList.add('visible', 'animated');

        // Handle staggered animations
        const staggeredChildren = element.querySelectorAll('[data-stagger]');
        staggeredChildren.forEach((child, index) => {
            const delay = child.dataset.stagger || index * 100;
            setTimeout(() => {
                child.classList.add('visible');
            }, delay);
        });

        // Trigger custom event
        const event = new CustomEvent('elementAnimated', {
            detail: { element }
        });
        document.dispatchEvent(event);
    }
}

// =============================================================================
// PARALLAX SCROLL EFFECTS
// =============================================================================

class ParallaxScroll {
    constructor() {
        this.elements = [];
        this.ticking = false;
        this.init();
    }

    init() {
        this.findParallaxElements();
        this.bindEvents();
    }

    findParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        parallaxElements.forEach(element => {
            this.elements.push({
                element,
                speed: parseFloat(element.dataset.parallax) || 0.5,
                offset: element.offsetTop
            });
        });
    }

    bindEvents() {
        if (this.elements.length === 0) return;

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;

        this.elements.forEach(item => {
            const { element, speed, offset } = item;
            const yPos = -(scrollTop - offset) * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// =============================================================================
// KEYBOARD NAVIGATION
// =============================================================================

class KeyboardNavigation {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }

    handleKeyPress(e) {
        switch (e.key) {
            case 'Home':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.scrollToTop();
                }
                break;

            case 'End':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.scrollToBottom();
                }
                break;

            case 'PageUp':
                e.preventDefault();
                this.scrollByViewport(-0.8);
                break;

            case 'PageDown':
                e.preventDefault();
                this.scrollByViewport(0.8);
                break;
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollToBottom() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }

    scrollByViewport(ratio) {
        const currentScroll = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const targetScroll = currentScroll + (viewportHeight * ratio);

        window.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: 'smooth'
        });
    }
}

// =============================================================================
// INITIALIZE ON DOM READY
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scroll
    const smoothScroll = new SmoothScroll({
        duration: 800,
        easing: 'easeInOutCubic',
        offset: 80
    });

    // Initialize scroll to top button
    const scrollToTop = new ScrollToTop();

    // Initialize scroll animations
    const scrollAnimations = new ScrollAnimations();

    // Initialize parallax (only on larger screens for performance)
    if (window.innerWidth > 768) {
        const parallaxScroll = new ParallaxScroll();
    }

    // Initialize keyboard navigation
    const keyboardNav = new KeyboardNavigation();

    console.log('✨ Smooth scrolling and animations initialized');
});

// =============================================================================
// EXPORT FOR MODULE USAGE
// =============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SmoothScroll,
        ScrollToTop,
        ScrollAnimations,
        ParallaxScroll,
        KeyboardNavigation
    };
}