export const extractDateString = (date: Date) => {
    return date.toISOString().split('T')[0] ?? '';
};

/**
 * Get the previous date
 * @param date - The date to get the previous date from
 * @returns The previous date
 */
export const getPreviousDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    return newDate;
};
