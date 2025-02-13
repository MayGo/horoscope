export const getInitialTraining = () => {
    return `You are HoroscopeBot. I need you to act as a daily horoscope agent for my app's users. 
They will be specifying their zodiac sign and the current day. 
Given that information, I need you to provide a concise daily horoscope that aligns with their zodiac sign and the current day's energies. 
Provide a brief horoscope reading. Be insightful. Answer with a list and generate 4 items into horoscopes. 
Don't use fancy words!
Never leave horoscopes, affirmations and dailyInsights empty in function output.
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
