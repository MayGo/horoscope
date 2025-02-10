import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MessageBox } from '~/components/MessageBox';
import { Button } from '~/components/ui/button';
import { findDailyHoroscope } from '~/server/redis/redisQueries';
import { type HoroscopeSignType } from '~/utils/values';
interface SelectedSignProps {
    name: HoroscopeSignType;
}

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0] ?? '';
};

export async function SelectedSign({ name }: SelectedSignProps) {
    const today = getTodayDate();

    const dailyHoroscope = await findDailyHoroscope(name, today);

    if (!dailyHoroscope) {
        return (
            <Box p={4}>
                <MessageBox type="error" content="No horoscope found for today" />
            </Box>
        );
    }

    return (
        <VStack justifyContent="space-between" height="full">
            <Flex justifyContent="space-between" justifyItems="center" alignItems="baseline" w="full">
                <Heading size="3xl">{name}</Heading>
                <Text fontSize="md" fontWeight="light">
                    {today}
                    {dailyHoroscope.date}
                </Text>
            </Flex>
            <Text fontSize="md" fontWeight="bold" color="textColorGray" whiteSpace="pre-line">
                {dailyHoroscope.horoscopes.map((horoscope) => horoscope).join('\n')}
            </Text>
            <NextLink href="/personalization" passHref legacyBehavior>
                <Button variant="outline" colorScheme="yellow">
                    Personalized Horoscope
                </Button>
            </NextLink>
        </VStack>
    );
}
