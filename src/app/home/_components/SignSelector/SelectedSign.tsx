import { Box, VStack } from '@chakra-ui/react';
import { PersonalizedHoroscopeButton } from '~/app/_components/PersonalizedHoroscopeButton';
import Horoscope from '~/app/my-horoscope/Horoscope';
import { MessageBox } from '~/components/MessageBox';
import { getTodaysDailyHoroscope } from '~/server/redis/dailyHoroscopeKV.queries';
import { type HoroscopeSignType } from '~/utils/values';

interface SelectedSignProps {
    name: HoroscopeSignType;
}

export async function SelectedSign({ name }: SelectedSignProps) {
    const dailyHoroscope = await getTodaysDailyHoroscope(name);

    if (!dailyHoroscope) {
        return (
            <Box p={4}>
                <MessageBox type="error" content="No horoscope found for today" />
            </Box>
        );
    }

    return (
        <VStack height="full" gap={8} px={[4, 4, 4, 8]}>
            <Horoscope horoscope={dailyHoroscope} />
            <PersonalizedHoroscopeButton />
        </VStack>
    );
}
