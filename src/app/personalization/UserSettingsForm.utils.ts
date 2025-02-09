'use client';

import { HoroscopeAge, HoroscopeLength, HoroscopeSign, TimeOfDay } from '~/utils/values';

export const horoscopeAgesOptions = Object.values(HoroscopeAge).map((age) => ({
    label: age as string,
    value: age as string
}));

export const horoscopeLengthsOptions = Object.values(HoroscopeLength).map((len) => ({
    label: len as string,
    value: len as string
}));

export const horoscopeSignsOptions = Object.values(HoroscopeSign).map((sign) => ({
    label: sign as string,
    value: sign as string
}));

export const timeOfDaysOptions = Object.values(TimeOfDay).map((time) => ({
    label: time as string,
    value: time as string
}));
