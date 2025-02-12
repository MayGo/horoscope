import { HoroscopeSigns } from '~/utils/values';

export interface SelectedSignItem {
    name: string;
    dateRange: string;
    image: string;
}

export const signList: SelectedSignItem[] = [
    {
        name: HoroscopeSigns.aries,
        dateRange: 'Mar 21 - Apr 19',
        image: '/signs/aries.png'
    },
    {
        name: HoroscopeSigns.taurus,
        dateRange: 'Apr 20 - May 20',
        image: '/signs/taurus.png'
    },
    { name: HoroscopeSigns.gemini, dateRange: 'May 21 - Jun 20', image: '/signs/gemini.png' },
    {
        name: HoroscopeSigns.cancer,
        dateRange: 'Jun 21 - Jul 22',
        image: '/signs/cancer.png'
    },
    { name: HoroscopeSigns.leo, dateRange: 'Jul 23 - Aug 22', image: '/signs/leo.png' },
    {
        name: HoroscopeSigns.virgo,
        dateRange: 'Aug 23 - Sep 22',
        image: '/signs/virgo.png'
    },
    {
        name: HoroscopeSigns.libra,
        dateRange: 'Sep 23 - Oct 22',
        image: '/signs/libra.png'
    },
    {
        name: HoroscopeSigns.scorpio,
        dateRange: 'Oct 23 - Nov 21',
        image: '/signs/scorpio.png'
    },
    {
        name: HoroscopeSigns.sagittarius,
        dateRange: 'Nov 22 - Dec 21',
        image: '/signs/sagittarius.png'
    },
    {
        name: HoroscopeSigns.capricorn,
        dateRange: 'Dec 22 - Jan 19',
        image: '/signs/capricorn.png'
    },
    {
        name: HoroscopeSigns.aquarius,
        dateRange: 'Jan 20 - Feb 18',
        image: '/signs/aquarius.png'
    },
    {
        name: HoroscopeSigns.pisces,
        dateRange: 'Feb 19 - Mar 20',
        image: '/signs/pisces.png'
    }
];
