/**
 * FORM HANDLING & VALIDATION
 * RSVP form with comprehensive validation and submission
 */

// =============================================================================
// FORM MANAGER CLASS
// =============================================================================

class FormManager {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.isSubmitting = false;
        this.validationRules = {
            firstName: { required: true, minLength: 2 },
            lastName: { required: true, minLength: 2 },
            email: { required: true, email: true },
            phone: { phone: true },
            attendance: { required: true },
            dietary: {},
            message: { maxLength: 500 }
        };

        // Initialize EmailJS
        this.initializeEmailJS();

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.setupRealTimeValidation();
        this.setupFormSubmission();
        console.log('📝 Form manager initialized');
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Field validation on blur
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });

            field.addEventListener('input', () => {
                this.clearFieldError(field);
                if (field.value.trim() !== '') {
                    this.validateField(field, false); // Silent validation
                }
            });
        });
    }

    setupRealTimeValidation() {
        const emailField = this.form.querySelector('#email');
        const phoneField = this.form.querySelector('#phone');

        // Email validation with suggestions
        if (emailField) {
            emailField.addEventListener('input', () => {
                this.validateEmailWithSuggestions(emailField);
            });
        }

        // Phone number formatting
        if (phoneField) {
            phoneField.addEventListener('input', () => {
                this.formatPhoneNumber(phoneField);
            });
        }
    }

    setupFormSubmission() {
        // Add loading states and success/error handling
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
            `;
            document.body.appendChild(container);
        }
    }

    // =============================================================================
    // VALIDATION METHODS
    // =============================================================================

    validateField(field, showError = true) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[fieldName] || {};
        const group = field.closest('.form-group');

        // Clear previous states
        group.classList.remove('error', 'success');

        // Required validation
        if (rules.required && value === '') {
            if (showError) {
                this.showFieldError(field, 'This field is required');
            }
            return false;
        }

        // Email validation
        if (rules.email && value !== '') {
            if (!this.isValidEmail(value)) {
                if (showError) {
                    this.showFieldError(field, 'Please enter a valid email address');
                }
                return false;
            }
        }

        // Phone validation
        if (rules.phone && value !== '') {
            if (!this.isValidPhone(value)) {
                if (showError) {
                    this.showFieldError(field, 'Please enter a valid phone number');
                }
                return false;
            }
        }

        // Min length validation
        if (rules.minLength && value.length > 0 && value.length < rules.minLength) {
            if (showError) {
                this.showFieldError(field, `Minimum ${rules.minLength} characters required`);
            }
            return false;
        }

        // Max length validation
        if (rules.maxLength && value.length > rules.maxLength) {
            if (showError) {
                this.showFieldError(field, `Maximum ${rules.maxLength} characters allowed`);
            }
            return false;
        }

        // Success state
        if (value !== '') {
            group.classList.add('success');
        }

        return true;
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        // Remove all non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        // Check if it's a valid length (10-15 digits)
        return cleaned.length >= 10 && cleaned.length <= 15;
    }

    // =============================================================================
    // ERROR HANDLING
    // =============================================================================

    showFieldError(field, message) {
        const group = field.closest('.form-group');
        group.classList.add('error');

        // Remove existing error
        this.clearFieldError(field);

        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 5px;
            animation: fadeInUp 0.3s ease;
        `;

        group.appendChild(errorDiv);

        // Shake animation
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    clearFieldError(field) {
        const group = field.closest('.form-group');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        group.classList.remove('error');
    }

    // =============================================================================
    // FORM SUBMISSION
    // =============================================================================

    async handleSubmit() {
        if (this.isSubmitting) return;

        // Validate form
        if (!this.validateForm()) {
            this.showNotification('Please fix the errors above', 'error');
            return;
        }

        this.isSubmitting = true;
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        try {
            // Show loading state
            this.showLoadingState(submitButton);

            // Collect form data
            const formData = this.collectFormData();

            // Submit form (replace with your actual submission logic)
            const result = await this.submitForm(formData);

            // Success handling
            this.handleSubmissionSuccess(result, formData);

        } catch (error) {
            console.error('Form submission error:', error);
            this.handleSubmissionError(error);
        } finally {
            this.isSubmitting = false;
            this.hideLoadingState(submitButton, originalText);
        }
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }

        // Add timestamp
        data.timestamp = new Date().toISOString();

        return data;
    }

    initializeEmailJS() {
        // Initialize EmailJS with your public key
        // Check if config is available
        const publicKey = typeof EMAILJS_CONFIG !== 'undefined' ? EMAILJS_CONFIG.publicKey : 'YOUR_PUBLIC_KEY';

        if (typeof emailjs !== 'undefined') {
            emailjs.init(publicKey);
            console.log('📧 EmailJS initialized');
        } else {
            console.warn('EmailJS not loaded');
        }
    }

    async submitForm(data) {
        const results = {
            googleSheets: { success: false, error: null },
            email: { success: false, error: null }
        };

        // =============================================================================
        // 1. SUBMIT TO GOOGLE SHEETS (Primary - Most Important!)
        // =============================================================================
        try {
            const sheetsResult = await this.submitToGoogleSheets(data);
            results.googleSheets.success = sheetsResult.success;
            console.log('✅ Google Sheets submission successful');
        } catch (error) {
            results.googleSheets.error = error.message;
            console.error('❌ Google Sheets submission failed:', error);
        }

        // =============================================================================
        // 2. SUBMIT VIA EMAILJS (Secondary - Nice to have)
        // =============================================================================
        try {
            const emailResult = await this.submitViaEmail(data);
            results.email.success = emailResult.success;
            console.log('✅ Email submission successful');
        } catch (error) {
            results.email.error = error.message;
            console.error('⚠️ Email submission failed:', error);
        }

        // =============================================================================
        // 3. EVALUATE RESULTS
        // =============================================================================

        // If Google Sheets succeeded, we're good!
        if (results.googleSheets.success) {
            return {
                success: true,
                message: 'RSVP submitted successfully! Check your email for confirmation.',
                showCalendar: data.attendance === 'yes',
                details: results
            };
        }

        // If Google Sheets failed but email succeeded, warn but still accept
        if (results.email.success) {
            return {
                success: true,
                message: 'RSVP received via email. We\'ll confirm receipt shortly.',
                showCalendar: data.attendance === 'yes',
                details: results,
                warning: 'Primary logging failed but email sent successfully.'
            };
        }

        // Both failed - this is a problem
        throw new Error(
            'Unable to submit RSVP. Please try again or contact us directly at ludovico.fidelia.wedding@gmail.com'
        );
    }

    async submitToGoogleSheets(data) {
        // Check if Google Sheets logging is enabled and configured
        if (typeof GOOGLE_SHEETS_CONFIG === 'undefined' || !GOOGLE_SHEETS_CONFIG.enabled) {
            console.warn('Google Sheets logging not configured');
            return { success: false, error: 'Not configured' };
        }

        const webAppUrl = GOOGLE_SHEETS_CONFIG.webAppUrl;

        if (!webAppUrl || webAppUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            console.warn('Google Sheets Web App URL not configured');
            return { success: false, error: 'URL not configured' };
        }

        // Prepare data for Google Sheets
        const sheetsData = {
            timestamp: new Date().toISOString(),
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            attendance: data.attendance || '',
            dietary: data.dietary || '',
            message: data.message || '',
            submissionDate: new Date().toLocaleDateString(),
            submissionTime: new Date().toLocaleTimeString(),
            userAgent: navigator.userAgent || '',
            ipInfo: 'Client-side submission'
        };

        // Submit with retry logic
        const maxRetries = GOOGLE_SHEETS_CONFIG.maxRetries || 3;
        const retryDelay = GOOGLE_SHEETS_CONFIG.retryDelay || 1000;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`📊 Attempting Google Sheets submission (attempt ${attempt}/${maxRetries})...`);

                const response = await fetch(webAppUrl, {
                    method: 'POST',
                    mode: 'no-cors', // Important for Google Apps Script
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sheetsData)
                });

                // Note: With no-cors mode, we can't read the response
                // We assume success if no error was thrown
                console.log('✅ Google Sheets request sent successfully');

                return {
                    success: true,
                    message: 'Data logged to Google Sheets',
                    attempt: attempt
                };

            } catch (error) {
                console.error(`❌ Google Sheets attempt ${attempt} failed:`, error);

                // If this was the last attempt, throw the error
                if (attempt === maxRetries) {
                    throw new Error(`Google Sheets logging failed after ${maxRetries} attempts: ${error.message}`);
                }

                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
            }
        }

        throw new Error('Google Sheets submission failed');
    }

    async submitViaEmail(data) {
        // Check if EmailJS is enabled and configured
        const emailConfig = typeof EMAILJS_CONFIG !== 'undefined' ? EMAILJS_CONFIG : null;

        if (!emailConfig || !emailConfig.enabled) {
            console.warn('EmailJS not configured or disabled');
            return { success: false, error: 'Not configured' };
        }

        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS library not loaded');
        }

        // Get configuration
        const serviceId = emailConfig.serviceId || 'YOUR_SERVICE_ID';
        const templateId = emailConfig.templateId || 'YOUR_TEMPLATE_ID';
        const guestTemplateId = emailConfig.guestTemplateId || 'YOUR_GUEST_TEMPLATE_ID';

        // Get form config for links
        const formConfig = typeof FORM_CONFIG !== 'undefined' ? FORM_CONFIG : {};
        const links = formConfig.links || {};

        const templateParams = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone || 'Not provided',
            attendance: data.attendance,
            dietary_restrictions: data.dietary,
            additional_info: data.message || 'None',
            submission_date: new Date().toLocaleDateString(),
            submission_time: new Date().toLocaleTimeString()
        };

        // Send email to you (the couple)
        await emailjs.send(
            serviceId,
            templateId,
            templateParams
        );

        // Send confirmation email to guest
        const guestTemplateParams = {
            to_email: data.email,
            guest_name: `${data.firstName} ${data.lastName}`,
            attendance_status: data.attendance,
            wedding_date: 'Friday, May 29th, 2026',
            wedding_time: '3:30 PM',
            wedding_venue: 'San Servolo Island, Venice, Italy',
            whatsapp_link: links.whatsapp || 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK',
            gdrive_link: links.googleDrive || 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID'
        };

        await emailjs.send(
            serviceId,
            guestTemplateId,
            guestTemplateParams
        );

        return {
            success: true,
            message: 'Emails sent successfully'
        };
    }

    handleSubmissionSuccess(result, formData) {
        // Clear form
        this.form.reset();

        // Remove success classes
        const groups = this.form.querySelectorAll('.form-group');
        groups.forEach(group => {
            group.classList.remove('success', 'filled');
        });

        // Show success message with enhanced content
        this.showEnhancedSuccessMessage(result, formData);

        // Track event (if analytics is available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: 'rsvp_form',
                value: formData.attendance === 'yes' ? 1 : 0
            });
        }
    }

    showEnhancedSuccessMessage(result, formData) {
        const container = document.querySelector('.notification-container');

        // Get links from config
        const formConfig = typeof FORM_CONFIG !== 'undefined' ? FORM_CONFIG : {};
        const links = formConfig.links || {};
        const whatsappLink = links.whatsapp || 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK';
        const gdriveLink = links.googleDrive || 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID';

        const notification = document.createElement('div');
        notification.className = 'notification notification-success enhanced-success';

        let calendarSection = '';
        if (result.showCalendar) {
            const calendarLinks = this.generateCalendarLinks();
            calendarSection = `
                <div class="success-section">
                    <h4>📅 Add to Your Calendar</h4>
                    <div class="calendar-buttons">
                        <a href="${calendarLinks.google}" target="_blank" class="calendar-btn google">
                            📅 Google Calendar
                        </a>
                        <a href="${calendarLinks.ics}" download="ludovico-fidelia-wedding.ics" class="calendar-btn ics">
                            📄 Download ICS
                        </a>
                    </div>
                </div>
            `;
        }

        notification.innerHTML = `
            <div class="enhanced-success-content">
                <div class="success-header">
                    <span class="success-icon">🎉</span>
                    <h3>Thank You, ${formData.firstName}!</h3>
                    <button class="notification-close" onclick="this.closest('.notification').remove()">×</button>
                </div>

                <p class="success-message">${result.message}</p>

                ${calendarSection}

                <div class="success-section">
                    <h4>📱 Stay Connected</h4>
                    <div class="social-buttons">
                        <a href="${whatsappLink}" target="_blank" class="social-btn whatsapp">
                            📱 Join WhatsApp Group
                        </a>
                        <a href="${gdriveLink}" target="_blank" class="social-btn gdrive">
                            📸 Access Photo Album
                        </a>
                    </div>
                </div>

                <div class="success-footer">
                    <p><em>We can't wait to celebrate with you! 💕</em></p>
                </div>
            </div>
        `;

        notification.style.cssText = `
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 0;
            border-radius: 15px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
            animation: slideInRight 0.5s ease;
            position: relative;
            overflow: hidden;
            max-width: 500px;
        `;

        container.appendChild(notification);

        // Auto remove after 15 seconds (longer for enhanced message)
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }
        }, 15000);
    }

    generateCalendarLinks() {
        // Get event details from config if available
        const formConfig = typeof FORM_CONFIG !== 'undefined' ? FORM_CONFIG : {};
        const configEvent = formConfig.event || {};

        const eventDetails = {
            title: configEvent.title || 'Ludovico & Fidelia Wedding',
            description: configEvent.description || 'Join us for our wedding celebration on the beautiful San Servolo Island in Venice.',
            location: configEvent.location || 'San Servolo Island, Venice, Italy',
            startDate: configEvent.startDate || '20260529T133000Z', // May 29, 2026, 3:30 PM UTC
            endDate: configEvent.endDate || '20260529T200000Z'      // May 29, 2026, 10:00 PM UTC
        };

        // Google Calendar URL
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;

        // ICS content
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ludovico & Fidelia//Wedding//EN
BEGIN:VEVENT
UID:${Date.now()}@ludovico-fidelia-wedding.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${eventDetails.startDate}
DTEND:${eventDetails.endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

        const icsBlob = new Blob([icsContent], { type: 'text/calendar' });
        const icsUrl = URL.createObjectURL(icsBlob);

        return {
            google: googleUrl,
            ics: icsUrl
        };
    }

    handleSubmissionError(error) {
        const message = error.message || 'Something went wrong. Please try again.';
        this.showNotification(message, 'error');
    }

    // =============================================================================
    // UI HELPERS
    // =============================================================================

    showLoadingState(button) {
        button.disabled = true;
        button.innerHTML = `
            <span class="loading-spinner"></span>
            Submitting...
        `;
        button.style.cursor = 'not-allowed';
    }

    hideLoadingState(button, originalText) {
        button.disabled = false;
        button.innerHTML = originalText;
        button.style.cursor = 'pointer';
    }

    showNotification(message, type = 'info') {
        const container = document.querySelector('.notification-container');

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        notification.style.cssText = `
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease;
            position: relative;
            overflow: hidden;
        `;

        container.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✓',
            error: '⚠',
            warning: '⚡',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    getNotificationColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || colors.info;
    }

    // =============================================================================
    // UTILITY METHODS
    // =============================================================================

    validateEmailWithSuggestions(field) {
        const value = field.value.trim();
        if (!value) return;

        // Common email domain suggestions
        const commonDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'icloud.com', 'aol.com', 'protonmail.com'
        ];

        const atIndex = value.lastIndexOf('@');
        if (atIndex > 0) {
            const domain = value.substring(atIndex + 1).toLowerCase();
            const suggestion = this.suggestDomain(domain, commonDomains);

            if (suggestion && suggestion !== domain) {
                this.showEmailSuggestion(field, value.substring(0, atIndex + 1) + suggestion);
            }
        }
    }

    suggestDomain(domain, commonDomains) {
        // Simple domain suggestion based on edit distance
        let minDistance = Infinity;
        let suggestion = null;

        for (const commonDomain of commonDomains) {
            const distance = this.levenshteinDistance(domain, commonDomain);
            if (distance < minDistance && distance <= 2) {
                minDistance = distance;
                suggestion = commonDomain;
            }
        }

        return suggestion;
    }

    levenshteinDistance(str1, str2) {
        const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

        for (let i = 0; i <= str1.length; i += 1) {
            matrix[0][i] = i;
        }

        for (let j = 0; j <= str2.length; j += 1) {
            matrix[j][0] = j;
        }

        for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i - 1] + 1, // deletion
                    matrix[j - 1][i] + 1, // insertion
                    matrix[j - 1][i - 1] + indicator // substitution
                );
            }
        }

        return matrix[str2.length][str1.length];
    }

    showEmailSuggestion(field, suggestion) {
        const group = field.closest('.form-group');
        let suggestionEl = group.querySelector('.email-suggestion');

        if (!suggestionEl) {
            suggestionEl = document.createElement('div');
            suggestionEl.className = 'email-suggestion';
            suggestionEl.style.cssText = `
                font-size: 0.85rem;
                color: #666;
                margin-top: 5px;
                cursor: pointer;
            `;
            group.appendChild(suggestionEl);
        }

        suggestionEl.innerHTML = `Did you mean <strong>${suggestion}</strong>?`;
        suggestionEl.onclick = () => {
            field.value = suggestion;
            field.focus();
            suggestionEl.remove();
            this.validateField(field);
        };
    }

    formatPhoneNumber(field) {
        let value = field.value.replace(/\D/g, '');

        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }

        field.value = value;
    }
}

// =============================================================================
// CSS ANIMATIONS FOR NOTIFICATIONS
// =============================================================================

const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .notification-close:hover {
        opacity: 1;
    }

    .form-group.error input,
    .form-group.error textarea {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }

    .form-group.success input,
    .form-group.success textarea {
        border-color: #27ae60;
        box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
    }

    /* Enhanced Success Message Styles */
    .enhanced-success-content {
        padding: 25px;
    }

    .success-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 15px;
    }

    .success-icon {
        font-size: 2rem;
    }

    .success-header h3 {
        margin: 0;
        flex-grow: 1;
        font-size: 1.5rem;
        font-family: 'Playfair Display', serif;
    }

    .success-message {
        margin-bottom: 25px;
        font-size: 1.1rem;
        opacity: 0.95;
    }

    .success-section {
        margin-bottom: 25px;
    }

    .success-section h4 {
        margin: 0 0 15px 0;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .calendar-buttons,
    .social-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .calendar-btn,
    .social-btn {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        text-decoration: none;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .calendar-btn:hover,
    .social-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        color: white;
    }

    .success-footer {
        margin-top: 25px;
        padding-top: 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        text-align: center;
    }

    .success-footer p {
        margin: 0;
        font-size: 1rem;
        opacity: 0.9;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// =============================================================================
// INITIALIZE FORM MANAGER
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const formManager = new FormManager('#rsvp-form');

    // Make it globally accessible for debugging
    window.formManager = formManager;

    console.log('📧 Form validation and submission ready');
});

// =============================================================================
// EXPORT FOR MODULE USAGE
// =============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormManager;
}