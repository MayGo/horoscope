import { HoroscopeSigns } from '~/utils/values';

export interface SelectedSignItem {
    name: string;
    dateRange: string;
    image: string;
}

export const signList: SelectedSignItem[] = [
    {
        name: HoroscopeSigns.aries,
        dateRange: 'March 21 - April 19',
        image: '/signs/aries.png'
    },
    {
        name: HoroscopeSigns.taurus,
        dateRange: 'April 20 - May 20',
        image: '/signs/taurus.png'
    },
    { name: HoroscopeSigns.gemini, dateRange: 'May 21 - June 20', image: '/signs/gemini.png' },
    {
        name: HoroscopeSigns.cancer,
        dateRange: 'June 21 - July 22',
        image: '/signs/cancer.png'
    },
    { name: HoroscopeSigns.leo, dateRange: 'July 23 - August 22', image: '/signs/leo.png' },
    {
        name: HoroscopeSigns.virgo,
        dateRange: 'August 23 - September 22',
        image: '/signs/virgo.png'
    },
    {
        name: HoroscopeSigns.libra,
        dateRange: 'September 23 - October 22',
        image: '/signs/libra.png'
    },
    {
        name: HoroscopeSigns.scorpio,
        dateRange: 'October 23 - November 21',
        image: '/signs/scorpio.png'
    },
    {
        name: HoroscopeSigns.sagittarius,
        dateRange: 'November 22 - December 21',
        image: '/signs/sagittarius.png'
    },
    {
        name: HoroscopeSigns.capricorn,
        dateRange: 'December 22 - January 19',
        image: '/signs/capricorn.png'
    },
    {
        name: HoroscopeSigns.aquarius,
        dateRange: 'January 20 - February 18',
        image: '/signs/aquarius.png'
    },
    {
        name: HoroscopeSigns.pisces,
        dateRange: 'February 19 - March 20',
        image: '/signs/pisces.png'
    }
];
