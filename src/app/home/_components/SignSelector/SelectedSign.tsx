import { Box, Flex, Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MessageBox } from '~/components/MessageBox';
import { Button } from '~/components/ui/button';
import { findTodaysDailyHoroscope } from '~/server/redis/redisQueries';
import { type HoroscopeSignType } from '~/utils/values';
interface SelectedSignProps {
    name: HoroscopeSignType;
}

export async function SelectedSign({ name }: SelectedSignProps) {
    const dailyHoroscope = await findTodaysDailyHoroscope(name);

    if (!dailyHoroscope) {
        return (
            <Box p={4}>
                <MessageBox type="error" content="No horoscope found for today" />
            </Box>
        );
    }

    return (
        <VStack height="full" gap={8}>
            <Flex justifyContent="space-between" justifyItems="center" alignItems="baseline" w="full">
                <Heading size="3xl" textTransform="capitalize">
                    {name}
                </Heading>
                <Text fontSize="md" fontWeight="light">
                    {dailyHoroscope.date}
                </Text>
            </Flex>
            <List.Root gap={4}>
                {dailyHoroscope.horoscopes.map((horoscope) => (
                    <ListItem key={horoscope} _marker={{ color: 'yellowColor' }}>
                        <Text fontSize="md" fontWeight="medium" whiteSpace="pre-line">
                            {horoscope}
                        </Text>
                    </ListItem>
                ))}
            </List.Root>
            <NextLink href="/personalization" passHref legacyBehavior>
                <Button variant="solid" colorScheme="yellow">
                    Personalized Horoscope
                </Button>
            </NextLink>
        </VStack>
    );
}
