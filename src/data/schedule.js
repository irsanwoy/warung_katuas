export const schedule = {
    days: 'Setiap Hari (Senin – Minggu)',
    openTime: '17:00',
    closeTime: '00:00',
    openHour: 17,
    closeHour: 24, // midnight = 24 for easy comparison
    timezone: 'Asia/Jakarta',
};

/**
 * Check if the business is currently open based on local time.
 * Open daily from 17:00 to 00:00 (midnight).
 */
export function isOpenNow() {
    const now = new Date();
    const hours = now.getHours();
    return hours >= schedule.openHour || hours < 0; // 17:00 - 00:00
}
