import 'server-only';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';

export const getExtraPrompt = (previousHoroscope?: HoroscopeResultsSchema) => {
    if (!previousHoroscope) {
        return undefined;
    }

    return `Make sure dailyInsights are not same as will be in the output:
    ${previousHoroscope.dailyInsights.map((insight) => `"${insight.name}":"${insight.value}"`).join(',')}
    `;
};
