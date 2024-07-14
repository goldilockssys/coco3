// src/utils/ShareUtils.js

/**
 * Generates a Google Maps link based on latitude and longitude
 * @param {number} latitude
 * @param {number} longitude
 * @returns {string} Google Maps link
 */
export function generateGoogleMapsLink(latitude, longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }
  