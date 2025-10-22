/**
 * Kebab Rain Easter Egg
 * Creates a rain of falling kebab images when the kebab button is clicked
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        kebabCount: 40,                // Number of kebabs per click
        kebabImages: ['kebab-1.png', 'kebab-2.png', 'kebab-3.png', 'kebab-4.png'],
        imagePath: 'assets/images/',
        minSize: 40,                   // Minimum kebab size in pixels
        maxSize: 80,                   // Maximum kebab size in pixels
        minDuration: 2000,             // Minimum fall duration in ms
        maxDuration: 5000,             // Maximum fall duration in ms
        maxDelay: 1000,                // Maximum delay before starting in ms
        cleanupDelay: 6000,            // Time before removing kebabs from DOM
        minRotation: -30,              // Minimum rotation in degrees
        maxRotation: 30                // Maximum rotation in degrees
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Get random number between min and max
     */
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Get random integer between min and max
     */
    function randomInt(min, max) {
        return Math.floor(random(min, max));
    }

    /**
     * Get random array element
     */
    function randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Create a falling kebab element
     */
    function createKebab() {
        const kebab = document.createElement('div');
        kebab.className = 'falling-kebab';

        const img = document.createElement('img');
        const randomImage = randomChoice(CONFIG.kebabImages);
        img.src = CONFIG.imagePath + randomImage;
        img.alt = '🥙';

        kebab.appendChild(img);

        // Random properties
        const size = random(CONFIG.minSize, CONFIG.maxSize);
        const leftPosition = random(-5, 105); // Allow slightly off-screen
        const duration = random(CONFIG.minDuration, CONFIG.maxDuration);
        const delay = random(0, CONFIG.maxDelay);
        const rotation = random(CONFIG.minRotation, CONFIG.maxRotation);
        const spinRotation = random(-720, 720); // Full spins during fall

        // Apply styles
        kebab.style.cssText = `
            position: fixed;
            left: ${leftPosition}%;
            top: -100px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: 9999;
            will-change: transform, opacity;
            animation: kebab-fall ${duration}ms linear ${delay}ms forwards;
            --rotation: ${rotation}deg;
            --spin-rotation: ${spinRotation}deg;
        `;

        return kebab;
    }

    /**
     * Make it rain kebabs!
     */
    function makeItRain() {
        // Don't animate if user prefers reduced motion
        if (prefersReducedMotion) {
            console.log('Kebab rain disabled: user prefers reduced motion');
            return;
        }

        const kebabs = [];

        // Create kebabs
        for (let i = 0; i < CONFIG.kebabCount; i++) {
            const kebab = createKebab();
            document.body.appendChild(kebab);
            kebabs.push(kebab);
        }

        // Clean up after animation
        setTimeout(() => {
            kebabs.forEach(kebab => {
                if (kebab && kebab.parentNode) {
                    kebab.parentNode.removeChild(kebab);
                }
            });
        }, CONFIG.cleanupDelay);
    }

    /**
     * Initialize the kebab button
     */
    function init() {
        const kebabButton = document.getElementById('kebab-button');

        if (!kebabButton) {
            console.warn('Kebab button not found');
            return;
        }

        // Add click event
        kebabButton.addEventListener('click', (e) => {
            e.preventDefault();
            makeItRain();
        });

        // Add touch support for mobile
        kebabButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            makeItRain();
        }, { passive: false });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
