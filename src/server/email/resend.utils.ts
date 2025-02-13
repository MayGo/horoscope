import { DateTime } from 'luxon';

export const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return {
        hours: hours ?? 0,
        minutes: minutes ?? 0
    };
};

export function createScheduledAt(time?: string, timezone?: string) {
    if (!time || !timezone) return undefined;

    const { hours, minutes } = parseTime(time);

    const nowInTimezone = DateTime.now().setZone(timezone);
    if (!nowInTimezone.isValid) {
        console.error('Invalid timezone', timezone);
        return undefined;
    }

    let targetDateTime = nowInTimezone.set({
        hour: hours,
        minute: minutes,
        second: 0,
        millisecond: 0
    });

    // If the target time has already passed TODAY in user's timezone, add 1 day
    if (targetDateTime < nowInTimezone) {
        targetDateTime = targetDateTime.plus({ days: 1 });
    }

    // Convert to UTC and validate
    const utcDateTime = targetDateTime.toUTC();
    if (utcDateTime < DateTime.utc()) {
        console.error('Converted UTC time is in past', utcDateTime.toISO());
        return undefined;
    }

    return utcDateTime.toISO();
}

export const generateEntityRefId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};
