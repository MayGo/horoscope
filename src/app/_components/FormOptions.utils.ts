'use client';

import { capitalize } from '~/utils/string.utils';
import { HoroscopeAge, HoroscopeLength, HoroscopeSigns, HoroscopeStyle, TimeOfDay } from '~/utils/values';

export const horoscopeAgesOptions = Object.values(HoroscopeAge).map((age) => ({
    label: capitalize(age as string),
    value: age as string
}));

export const horoscopeLengthsOptions = Object.values(HoroscopeLength).map((len) => ({
    label: capitalize(len as string),
    value: len as string
}));

export const horoscopeSignsOptions = [
    { label: '-', value: '' },
    ...Object.values(HoroscopeSigns).map((sign) => ({
        label: capitalize(sign as string),
        value: sign as string
    }))
];

export const horoscopeStylesOptions = [
    { label: '-', value: '' },
    ...Object.values(HoroscopeStyle).map((style) => ({
        label: capitalize(style as string),
        value: style as string
    }))
];
export const timeOfDaysOptions = [
    { label: '-', value: '' },
    ...Object.values(TimeOfDay).map((time) => ({
        label: time as string,
        value: time as string
    }))
];
