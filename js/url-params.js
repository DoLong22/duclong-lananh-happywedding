/**
 * URL Parameters Encryption/Decryption Utility
 * Handles secure encoding and decoding of wedding invitation parameters
 */

export class URLParamsEncoder {
    /**
     * Encode parameters to encrypted URL string
     * @param {Object} params - Parameters to encode (e.g., {guest: 'Name', venue: 'bride'})
     * @returns {string} - Base64 encoded string
     */
    static encode(params) {
        try {
            // Convert object to JSON string
            const jsonString = JSON.stringify(params);

            // Encode to Base64
            const base64 = btoa(unescape(encodeURIComponent(jsonString)));

            return base64;
        } catch (error) {
            console.error('Error encoding parameters:', error);
            return null;
        }
    }

    /**
     * Decode encrypted URL string to parameters object
     * @param {string} encodedString - Base64 encoded string
     * @returns {Object|null} - Decoded parameters object or null if invalid
     */
    static decode(encodedString) {
        try {
            // Decode from Base64
            const jsonString = decodeURIComponent(escape(atob(encodedString)));

            // Parse JSON to object
            const params = JSON.parse(jsonString);

            return params;
        } catch (error) {
            console.error('Error decoding parameters:', error);
            return null;
        }
    }

    /**
     * Get parameters from current URL
     * Supports both old format (?guest=name) and new encrypted format (?data=xxx)
     * @returns {Object} - Parameters object with guest name and venue info
     */
    static getParamsFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);

        // Check for encrypted format first
        const encodedData = urlParams.get('data');
        if (encodedData) {
            const decoded = this.decode(encodedData);
            if (decoded) {
                console.log('📦 Decoded parameters:', decoded);
                return decoded;
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
