/**
 * WEDDING WEBSITE CONFIGURATION
 * Configuration settings for external services
 */

// =============================================================================
// GOOGLE SHEETS LOGGING
// =============================================================================

// Google Apps Script Web App URL for logging RSVP submissions
// See GOOGLE_SHEETS_SETUP.md for setup instructions
const GOOGLE_SHEETS_CONFIG = {
    // Replace this URL with your deployed Google Apps Script web app URL
    // Get this from: Extensions > Apps Script > Deploy > New deployment > Web app
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
        title: 'Ludovico & Fidelia Wedding',
        description: 'Join us for our wedding celebration on the beautiful San Servolo Island in Venice. A fusion of Italian romance and Indonesian traditions awaits!',
        location: 'San Servolo Island, Venice, Italy',
        startDate: '20260529T133000Z', // May 29, 2026, 3:30 PM UTC (15:30 Italy time)
        endDate: '20260529T200000Z',   // May 29, 2026, 10:00 PM UTC (22:00 Italy time)
    },

    // Links to share with guests
    links: {
        whatsapp: 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK',
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
