import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const getGeneralHoroscope = query({
    args: { sign: v.string(), date: v.string() },
    handler: async (ctx, { sign, date }) => {
        const doc = await ctx.db
            .query('generalHoroscopes')
            .withIndex('by_sign_date', (q) => q.eq('sign', sign).eq('date', date))
            .unique();

        if (!doc || doc.expiresAt < Date.now()) return null;
        return doc.horoscope;
    }
});

export const setGeneralHoroscope = mutation({
    args: { sign: v.string(), date: v.string(), horoscope: v.any() },
    handler: async (ctx, { sign, date, horoscope }) => {
        const existing = await ctx.db
            .query('generalHoroscopes')
            .withIndex('by_sign_date', (q) => q.eq('sign', sign).eq('date', date))
            .unique();

        const expiresAt = Date.now() + SEVEN_DAYS_MS;

        if (existing) {
            await ctx.db.patch(existing._id, { horoscope, expiresAt });
        } else {
            await ctx.db.insert('generalHoroscopes', { sign, date, horoscope, expiresAt });
        }
    }
});

export const getUserHoroscope = query({
    args: { userId: v.string(), date: v.string() },
    handler: async (ctx, { userId, date }) => {
        const doc = await ctx.db
            .query('userHoroscopes')
            .withIndex('by_userId_date', (q) => q.eq('userId', userId).eq('date', date))
            .unique();

        if (!doc || doc.expiresAt < Date.now()) return null;
        return doc.horoscope;
    }
});

export const setUserHoroscope = mutation({
    args: { userId: v.string(), date: v.string(), horoscope: v.any() },
    handler: async (ctx, { userId, date, horoscope }) => {
        const existing = await ctx.db
            .query('userHoroscopes')
            .withIndex('by_userId_date', (q) => q.eq('userId', userId).eq('date', date))
            .unique();

        const expiresAt = Date.now() + SEVEN_DAYS_MS;

        if (existing) {
            await ctx.db.patch(existing._id, { horoscope, expiresAt });
        } else {
            await ctx.db.insert('userHoroscopes', { userId, date, horoscope, expiresAt });
        }
    }
});

export const deleteExpiredHoroscopes = mutation({
    args: {},
    handler: async (ctx) => {
        const now = Date.now();

        const expiredGeneral = await ctx.db
            .query('generalHoroscopes')
            .withIndex('by_expiresAt', (q) => q.lt('expiresAt', now))
            .collect();

        const expiredUser = await ctx.db
            .query('userHoroscopes')
            .withIndex('by_expiresAt', (q) => q.lt('expiresAt', now))
            .collect();

        await Promise.all([
            ...expiredGeneral.map((doc) => ctx.db.delete(doc._id)),
            ...expiredUser.map((doc) => ctx.db.delete(doc._id))
        ]);
    }
});
