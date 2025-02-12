export const HoroscopeLength = {
    Short: 'Short',
    Medium: 'Medium',
    Long: 'Long'
} as const;

export type HoroscopeLengthType = (typeof HoroscopeLength)[keyof typeof HoroscopeLength];

export const HoroscopeAge = {
    Today: 'Today',
    Tomorrow: 'Tomorrow'
} as const;

export type HoroscopeAgeType = (typeof HoroscopeAge)[keyof typeof HoroscopeAge];

export const TimeOfDay = {
    T00_00: '00:00',
    T01_00: '01:00',
    T02_00: '02:00',
    T03_00: '03:00',
    T04_00: '04:00',
    T05_00: '05:00',
    T06_00: '06:00',
    T07_00: '07:00',
    T08_00: '08:00',
    T09_00: '09:00',
    T10_00: '10:00',
    T11_00: '11:00',
    T12_00: '12:00',
    T13_00: '13:00',
    T14_00: '14:00',
    T15_00: '15:00',
    T16_00: '16:00',
    T17_00: '17:00',
    T18_00: '18:00',
    T19_00: '19:00',
    T20_00: '20:00',
    T21_00: '21:00',
    T22_00: '22:00',
    T23_00: '23:00'
} as const;

export type TimeOfDayType = (typeof TimeOfDay)[keyof typeof TimeOfDay];

export const HoroscopeSigns = {
    aries: 'aries',
    taurus: 'taurus',
    gemini: 'gemini',
    cancer: 'cancer',
    leo: 'leo',
    virgo: 'virgo',
    libra: 'libra',
    scorpio: 'scorpio',
    sagittarius: 'sagittarius',
    capricorn: 'capricorn',
    aquarius: 'aquarius',
    pisces: 'pisces'
} as const;

export type HoroscopeSignType = (typeof HoroscopeSigns)[keyof typeof HoroscopeSigns];
