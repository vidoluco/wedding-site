/**
 * WEDDING WEBSITE - MAIN JAVASCRIPT
 * Core functionality for interactions and animations
 */

// =============================================================================
// GLOBAL VARIABLES
// =============================================================================

let isScrolling = false;
let ticking = false;

// =============================================================================
// DOM CONTENT LOADED
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Wedding website loaded successfully!');

    // Initialize all components
    initializeNavigation();
    initializeScrollAnimations();
    initializeScrollIndicator();
    initializeParallax();
    initializeLazyLoading();
    initializeFormInteractions();
    initializeCelebrationDetails();

    // Add loading class removal
    document.body.classList.add('loaded');
});

// =============================================================================
// NAVIGATION
// =============================================================================

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Add scrolled class for styling
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide/show navbar on scroll (optional)
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }

                lastScrollTop = scrollTop;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// =============================================================================
// SCROLL ANIMATIONS
// =============================================================================

function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'in-view');

                // Add staggered animation to child elements
                const children = entry.target.querySelectorAll('.stagger');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-in-left, .fade-in-right, .scale-in, .section-transition'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to existing elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-image');
    const storyElements = document.querySelectorAll('.story-content h2, .story-text');
    const contactElements = document.querySelectorAll('.contact-content h2, .form-group');

    heroElements.forEach(el => el.classList.add('fade-in'));
    storyElements.forEach(el => el.classList.add('fade-in'));
    contactElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// =============================================================================
// SCROLL INDICATOR
// =============================================================================

function initializeScrollIndicator() {
    // Create scroll progress indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;

                scrollIndicator.style.width = scrolled + '%';
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// =============================================================================
// PARALLAX EFFECTS
// =============================================================================

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax, .date-background');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset;

                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrollTop * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// =============================================================================
// LAZY LOADING
// =============================================================================

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// =============================================================================
// FORM INTERACTIONS
// =============================================================================

function initializeFormInteractions() {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input) return;

        // Add floating label effect
        group.classList.add('floating-label');

        // Focus and blur effects
        input.addEventListener('focus', function() {
            group.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            group.classList.remove('focused');
            if (input.value.trim() !== '') {
                group.classList.add('filled');
            } else {
                group.classList.remove('filled');
            }
        });

        // Real-time validation
        input.addEventListener('input', function() {
            validateField(input);
        });
    });
}

// =============================================================================
// FORM VALIDATION
// =============================================================================

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.required;
    const group = field.closest('.form-group');

    // Remove existing error states
    group.classList.remove('error', 'success');

    // Required field validation
    if (required && value === '') {
        showFieldError(group, 'This field is required');
        return false;
    }

    // Email validation
    if (type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(group, 'Please enter a valid email address');
            return false;
        }
    }

    // Phone validation
    if (type === 'tel' && value !== '') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(group, 'Please enter a valid phone number');
            return false;
        }
    }

    // Success state
    if (value !== '') {
        group.classList.add('success');
    }

    return true;
}

function showFieldError(group, message) {
    group.classList.add('error');

    // Remove existing error message
    const existingError = group.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message;
    group.appendChild(errorDiv);

    // Shake animation
    group.classList.add('shake');
    setTimeout(() => {
        group.classList.remove('shake');
    }, 500);
}

// =============================================================================
// BUTTON EFFECTS
// =============================================================================

function addRippleEffect(e) {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    buttons.forEach(button => {
        button.addEventListener('click', addRippleEffect);
        button.classList.add('ripple-effect');
    });
});

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =============================================================================
// ACCESSIBILITY IMPROVEMENTS
// =============================================================================

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Focus management for skip links
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--button-bg);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', addSkipLink);

// =============================================================================
// ERROR HANDLING
// =============================================================================

window.addEventListener('error', function(e) {
    console.error('❌ JavaScript error:', e.error);
    // You could send this to analytics or error tracking service
});

// =============================================================================
// PERFORMANCE MONITORING
// =============================================================================

// Log page load performance
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`📊 Page loaded in ${loadTime}ms`);
    }
});

// =============================================================================
// EXPORT FUNCTIONS (if using modules)
// =============================================================================

// =============================================================================
// CELEBRATION DETAILS ACCORDION
// =============================================================================

function toggleDetail(detailId) {
    const content = document.getElementById(detailId);
    const header = content.previousElementSibling;

    // Simply toggle the clicked detail without affecting others
    content.classList.toggle('active');
    header.classList.toggle('active');
}

// Initialize celebration details
function initializeCelebrationDetails() {
    const detailHeaders = document.querySelectorAll('.detail-header');

    detailHeaders.forEach(header => {
        // Add keyboard accessibility
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');

        // Add keyboard support
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const detailId = this.nextElementSibling.id;
                toggleDetail(detailId);
            }
        });

        // Update aria-expanded when clicked
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = content.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    });
}

// Global functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.toggleDetail = toggleDetail;