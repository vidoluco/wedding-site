/**
 * WEDDING WEBSITE CONFIGURATION - EXAMPLE FILE
 *
 * SETUP INSTRUCTIONS:
 * 1. Copy this file to config.js: cp config.example.js config.js
 * 2. Fill in your actual values in config.js
 * 3. Never commit config.js (it's in .gitignore)
 */

// =============================================================================
// GOOGLE SHEETS LOGGING
// =============================================================================

// Google Apps Script Web App URL for logging RSVP submissions
// Get this from: Extensions > Apps Script > Deploy > New deployment > Web app
const GOOGLE_SHEETS_CONFIG = {
    // Replace with your deployed Apps Script Web App URL
    webAppUrl: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',

    // Enable/disable Google Sheets logging
    enabled: true,

    // Retry configuration
    maxRetries: 3,
    retryDelay: 1000, // milliseconds
};

// =============================================================================
// EMAILJS CONFIGURATION
// =============================================================================

const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    guestTemplateId: 'YOUR_GUEST_TEMPLATE_ID',

    // Enable/disable EmailJS
    enabled: true,
};

// =============================================================================
// FORM CONFIGURATION
// =============================================================================

const FORM_CONFIG = {
    // Event details for calendar invites
    event: {
        title: 'Your Wedding Title',
        description: 'Wedding celebration description',
        location: 'Wedding Venue Location',
        startDate: '20260529T133000Z', // Format: YYYYMMDDTHHmmssZ
        endDate: '20260529T200000Z',
    },

    // Links to share with guests
    links: {
        whatsapp: 'https://chat.whatsapp.com/IeEXqXxzhgh7fLk3txiyXL?mode=wwc',
        googleDrive: 'https://drive.google.com/drive/folders/1PrqYuW-r0TgbHW19ElEZUiYiOsFheHm5?usp=sharing',
    },

    // Form validation settings
    validation: {
        minNameLength: 2,
        maxMessageLength: 500,
        phoneMinDigits: 10,
        phoneMaxDigits: 15,
    },

    // Notification settings
    notifications: {
        successDuration: 15000, // 15 seconds
        errorDuration: 5000,    // 5 seconds
    },
};

// =============================================================================
// EXPORT CONFIGURATION (for ES6 modules - if needed in the future)
// =============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GOOGLE_SHEETS_CONFIG,
        EMAILJS_CONFIG,
        FORM_CONFIG,
    };
}
