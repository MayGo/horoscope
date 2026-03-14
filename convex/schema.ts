import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    userSettings: defineTable({
        userId: v.string(),
        name: v.string(),
        timezone: v.string(),
        emailTime: v.string(),
        horoscopeAge: v.string(),
        horoscopeLength: v.string(),
        horoscopeStyle: v.string(),
        sign: v.string(),
        countryOfBirth: v.string(),
        dateOfBirth: v.string(),
        timeOfBirth: v.string(),
        lifeGoal: v.string(),
        isAdmin: v.boolean(),
        sendEmailAllowed: v.boolean(),
        createdAt: v.number(),
        updatedAt: v.number()
    }).index('by_userId', ['userId']),

    generalHoroscopes: defineTable({
        sign: v.string(),
        date: v.string(),
        horoscope: v.any(),
        expiresAt: v.number()
    })
        .index('by_sign_date', ['sign', 'date'])
        .index('by_expiresAt', ['expiresAt']),

    userHoroscopes: defineTable({
        userId: v.string(),
        date: v.string(),
        horoscope: v.any(),
        expiresAt: v.number()
    })
        .index('by_userId_date', ['userId', 'date'])
        .index('by_expiresAt', ['expiresAt'])
});
