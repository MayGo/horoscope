export const extractDateString = (date: Date) => {
    return date.toISOString().split('T')[0] ?? '';
};
