import type { HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';

export const getWhatNotDoGenerate = (previousHoroscope?: HoroscopeResultsSchema) => {
    if (!previousHoroscope) {
        return '';
    }

    return `Make sure dailyInsights are not same as will be in the output:
    ${previousHoroscope.dailyInsights.map((insight) => `"${insight.name}":"${insight.value}"`).join(',')}
    `;
};
