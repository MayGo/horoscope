import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const findByUserId = query({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        return ctx.db
            .query('userSettings')
            .withIndex('by_userId', (q) => q.eq('userId', userId))
            .unique();
    }
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return ctx.db.query('userSettings').collect();
    }
});

export const getAllEmailOptedIn = query({
    args: {},
    handler: async (ctx) => {
        return ctx.db
            .query('userSettings')
            .filter((q) => q.eq(q.field('sendEmailAllowed'), true))
            .collect();
    }
});

export const upsert = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        timezone: v.optional(v.string()),
        emailTime: v.optional(v.string()),
        horoscopeAge: v.optional(v.string()),
        horoscopeLength: v.optional(v.string()),
        horoscopeStyle: v.optional(v.string()),
        sign: v.string(),
        countryOfBirth: v.optional(v.string()),
        dateOfBirth: v.optional(v.string()),
        timeOfBirth: v.optional(v.string()),
        lifeGoal: v.optional(v.string()),
        sendEmailAllowed: v.optional(v.boolean())
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query('userSettings')
            .withIndex('by_userId', (q) => q.eq('userId', args.userId))
            .unique();

        const now = Date.now();

        if (!existing) {
            await ctx.db.insert('userSettings', {
                userId: args.userId,
                name: args.name,
                timezone: args.timezone ?? 'UTC',
                emailTime: args.emailTime ?? '00:00',
                horoscopeAge: args.horoscopeAge ?? 'Today',
                horoscopeLength: args.horoscopeLength ?? 'Short',
                horoscopeStyle: args.horoscopeStyle ?? 'Clear & Direct',
                sign: args.sign,
                countryOfBirth: args.countryOfBirth ?? '',
                dateOfBirth: args.dateOfBirth ?? '',
                timeOfBirth: args.timeOfBirth ?? '00:00',
                lifeGoal: args.lifeGoal ?? '',
                isAdmin: false,
                sendEmailAllowed: args.sendEmailAllowed ?? false,
                createdAt: now,
                updatedAt: now
            });
        } else {
            await ctx.db.patch(existing._id, {
                name: args.name,
                timezone: args.timezone ?? existing.timezone,
                emailTime: args.emailTime ?? existing.emailTime,
                horoscopeAge: args.horoscopeAge ?? existing.horoscopeAge,
                horoscopeLength: args.horoscopeLength ?? existing.horoscopeLength,
                horoscopeStyle: args.horoscopeStyle ?? existing.horoscopeStyle,
                sign: args.sign,
                countryOfBirth: args.countryOfBirth ?? existing.countryOfBirth,
                dateOfBirth: args.dateOfBirth ?? existing.dateOfBirth,
                timeOfBirth: args.timeOfBirth ?? existing.timeOfBirth,
                lifeGoal: args.lifeGoal ?? existing.lifeGoal,
                sendEmailAllowed: args.sendEmailAllowed ?? existing.sendEmailAllowed,
                updatedAt: now
            });
        }
    }
});

export const deleteByUserId = mutation({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        const existing = await ctx.db
            .query('userSettings')
            .withIndex('by_userId', (q) => q.eq('userId', userId))
            .unique();

        if (existing) {
            await ctx.db.delete(existing._id);
        }
    }
});
