/**
 * URL Parameters Encryption/Decryption Utility
 * Handles secure encoding and decoding of wedding invitation parameters
 */

export class URLParamsEncoder {
    /**
     * Encode parameters to encrypted URL string
     * @param {Object} params - Parameters to encode (e.g., {guest: 'Name', venue: 'bride'})
     * @returns {string} - URL-safe Base64 encoded string
     */
    static encode(params) {
        try {
            // Convert object to JSON string
            const jsonString = JSON.stringify(params);

            // Encode to Base64 (Unicode-safe method)
            // Convert string to UTF-8 bytes, then to Base64
            const utf8Bytes = new TextEncoder().encode(jsonString);
            const base64 = btoa(String.fromCharCode(...utf8Bytes));

            // Make URL-safe: replace +/= with -_~ for better compatibility
            const urlSafe = base64
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '~');

            return urlSafe;
        } catch (error) {
            console.error('Error encoding parameters:', error);
            return null;
        }
    }

    /**
     * Decode encrypted URL string to parameters object
     * @param {string} encodedString - URL-safe Base64 encoded string
     * @returns {Object|null} - Decoded parameters object or null if invalid
     */
    static decode(encodedString) {
        try {
            // Convert URL-safe back to standard Base64
            const base64 = encodedString
                .replace(/-/g, '+')
                .replace(/_/g, '/')
                .replace(/~/g, '=');

            // Decode from Base64 (Unicode-safe method)
            // Convert Base64 to bytes, then to UTF-8 string
            const binaryString = atob(base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const jsonString = new TextDecoder().decode(bytes);

            // Parse JSON to object
            const params = JSON.parse(jsonString);

            return params;
        } catch (error) {
            console.error('Error decoding parameters:', error);
            return null;
        }
    }

    /**
     * Legacy decode method for compatibility with older browsers or in-app browsers
     * @param {string} encodedString - URL-safe Base64 encoded string
     * @returns {Object|null} - Decoded parameters object or null if invalid
     */
    static decodeLegacy(encodedString) {
        try {
            // Convert URL-safe back to standard Base64
            const base64 = encodedString
                .replace(/-/g, '+')
                .replace(/_/g, '/')
                .replace(/~/g, '=');

            // Try simple atob + JSON.parse for basic cases
            const jsonString = atob(base64);
            const params = JSON.parse(jsonString);
            return params;
        } catch (error) {
            console.error('Error in legacy decode:', error);

            // Try with decodeURIComponent
            try {
                const base64 = encodedString
                    .replace(/-/g, '+')
                    .replace(/_/g, '/')
                    .replace(/~/g, '=');
                const jsonString = decodeURIComponent(atob(base64));
                const params = JSON.parse(jsonString);
                return params;
            } catch (err) {
                console.error('Error in legacy decode with decodeURIComponent:', err);
                return null;
            }
        }
    }

    /**
     * Detect if running in Facebook/Messenger in-app browser
     * @returns {boolean}
     */
    static isInAppBrowser() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        return (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1) || (ua.indexOf('Instagram') > -1);
    }

    /**
     * Get parameters from current URL
     * Supports both old format (?guest=name) and new encrypted format (?data=xxx)
     * @returns {Object} - Parameters object with guest name and venue info
     */
    static getParamsFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);

        // Detect in-app browser
        if (this.isInAppBrowser()) {
            console.log('⚠️ Detected Facebook/Messenger in-app browser');
        }

        // Check for encrypted format first
        const encodedData = urlParams.get('data');
        if (encodedData) {
            // Try multiple decode methods for compatibility
            let decoded = this.decode(encodedData);

            // If decode fails in in-app browser, try alternative method
            if (!decoded && this.isInAppBrowser()) {
                console.log('🔄 Trying alternative decode method for in-app browser...');
                decoded = this.decodeLegacy(encodedData);
            }

            if (decoded) {
                console.log('📦 Decoded parameters:', decoded);
                return decoded;
            } else {
                console.error('❌ Failed to decode data parameter');
            }
        }

        // Fallback to old format for backward compatibility
        const guestParam = urlParams.get('guest');
        if (guestParam) {
            console.log('📝 Using legacy format:', guestParam);
            return {
                guest: decodeURIComponent(guestParam),
                venue: 'groom' // Default venue
            };
        }

        return null;
    }

    /**
     * Generate full URL with encrypted parameters
     * @param {string} baseUrl - Base URL of the website
     * @param {Object} params - Parameters to encode
     * @returns {string} - Complete URL with encrypted parameters
     */
    static generateUrl(baseUrl, params) {
        const encoded = this.encode(params);
        if (!encoded) {
            return baseUrl;
        }

        return `${baseUrl}?data=${encoded}`;
    }
}

// Export for use in other modules
window.URLParamsEncoder = URLParamsEncoder;
