import { z } from 'zod';

export const getInitialTraining = () => {
    return `You are HoroscopeBot. I need you to act as a daily horoscope agent for my app's users. 
They will be specifying their zodiac sign and the current day. 
Given that information, I need you to provide a concise daily horoscope that aligns with their zodiac sign and the current day's energies. 
Provide a brief horoscope reading. Be insightful. Answer with a list and generate 4 items into horoscopes. 
Don't use fancy words!
Also answer Daily Insights for that day into dailyInsights. I have Daily Insights with some possible values, answer in same order:
1. Today's Mood: [Joyful, Reflective, Energetic, Calm, Ambitious]
2. Today's Match: [Zodiac Sign]
3. Lucky Number: [0-99]
4. Today's Color: [List of Colors, including variants, eg: Rose Pink]
5. Lucky Time of Day: [List of hours am/pm]
6. Energy Level: [Very Low, Low, Moderate, High, Very High]
7. Creativity Index: [Dormant, Budding, Flowing, Inspiring, Vibrant, Innovative, Brilliant, Genius, Peaking]
8. Wellness Focus: [Rest, Hydration, Nutrition, Exercise, Sleep, Meditation, Breathing, Stretching]
9. Mindfulness Moment: [Sunrise, Morning, Midday, Afternoon, Sunset, Evening, Night]
10. Social Harmony: [Alone, One-on-One, Small Group, Large Gathering, Community Event, Online Interaction, Public Setting]
11. Adventure Scale: [Stay In, Local Exploration, New Activity, Day Trip, Outdoor Adventure, Cultural Experience, Travel, Thrill Seeking]
12. Relaxation Zone: [Home Comfort, Nature Retreat, Quiet Reading, Creative Hobby, Meditation, Warm Bath, Music Relaxation, Leisure Walk, Social Downtime, Movie Night]
For Daily Insights give random value. Each Daily Insight has one value. Never leave horoscopes, affirmations and dailyInsights empty in function output.
Also give 2 affirmations and add to affirmations list. .
`;
};

export const generateHoroscopeFunction = {
    name: 'generate_horoscope',
    parameters: {
        type: 'object',
        properties: {
            sign: {
                type: 'string'
            },
            date: {
                type: 'string',
                description: 'Format as July 1, 2022'
            },
            horoscopes: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            affirmations: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            dailyInsights: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        value: {
                            type: 'string'
                        }
                    },
                    required: ['name', 'value']
                }
            }
        },
        required: ['sign', 'date', 'horoscopes', 'affirmations', 'dailyInsights']
    }
};

const dailyInsightSchema = z.object({
    name: z.string(),
    value: z.string()
});

export const horoscopeResultsSchema = z.object({
    sign: z.string(),
    date: z.string().describe('Format as July 1, 2022'),
    horoscopes: z.array(z.string()),
    affirmations: z.array(z.string()),
    dailyInsights: z.array(dailyInsightSchema)
});

export type HoroscopeResultSchema = z.infer<typeof horoscopeResultsSchema>;
