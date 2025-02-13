import { auth } from '@clerk/nextjs/server';
import { makeUserHoroscope } from '../business/business.user';
import { userHoroscopeKV } from './userHoroscopeKV';

export const findMyDailyHoroscope = async () => {
    const authUser = await auth();

    if (!authUser.userId) {
        throw new Error('User not authenticated');
    }

    const today = new Date();
    const horoscope = await userHoroscopeKV.get(authUser.userId, today);

    if (!horoscope) {
        // make the initial horoscope
        const newHoroscope = await makeUserHoroscope(authUser.userId);

        if (!newHoroscope) {
            console.error('Failed to create and save user daily horoscope');
            return null;
        }

        return newHoroscope;
    }

    return horoscope;
};
