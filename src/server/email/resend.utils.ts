export const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return {
        hours: hours ?? 0,
        minutes: minutes ?? 0
    };
};

export function createScheduledAt(time?: string, timezone?: string) {
    // time is in format 14:00
    if (!time || !timezone) return undefined;

    const { hours, minutes } = parseTime(time);

    // Create date in user's timezone
    const userDate = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
    userDate.setHours(hours);
    userDate.setMinutes(minutes);

    // Convert to UTC for scheduling
    const utcDate = new Date(userDate.toLocaleString('en-US', { timeZone: 'UTC' }));

    // Check if scheduled time is in the past
    if (utcDate < new Date()) {
        console.log('Date is in the past, returning undefined');
        return undefined;
    }

    return utcDate.toISOString();
}

export const generateEntityRefId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};
