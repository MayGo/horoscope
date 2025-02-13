import { Box, Flex, Heading, List, ListItem, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import type { DailyInsightSchema, HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';

export default function Horoscope({ horoscope }: { horoscope: HoroscopeResultsSchema }) {
    return (
        <VStack gap={6} alignItems="flex-start">
            <Flex justifyContent="space-between" justifyItems="center" alignItems="baseline" w="full">
                <Heading size="3xl" textTransform="capitalize">
                    {horoscope.sign}
                </Heading>
                <Text fontSize="md" fontWeight="light">
                    {horoscope.date}
                </Text>
            </Flex>

            <List.Root gap={4}>
                {horoscope.horoscopes.map((item) => (
                    <ListItem key={item} _marker={{ color: 'yellowColor' }}>
                        <Text fontSize="md" fontWeight="medium" whiteSpace="pre-line">
                            {item}
                        </Text>
                    </ListItem>
                ))}
            </List.Root>

            <Heading as="h3" size="xl" pt={4}>
                Affirmations
            </Heading>
            <List.Root gap={4}>
                {horoscope.affirmations.map((affirmation) => (
                    <ListItem key={affirmation} _marker={{ color: 'yellowColor' }}>
                        <Text fontSize="md" fontWeight="medium" whiteSpace="pre-line">
                            {affirmation}
                        </Text>
                    </ListItem>
                ))}
            </List.Root>

            <Heading as="h3" size="xl" pt={4}>
                Daily Insights
            </Heading>

            <DailyInsights dailyInsights={horoscope.dailyInsights} />
        </VStack>
    );
}

const DailyInsights = ({ dailyInsights }: { dailyInsights: DailyInsightSchema[] }) => {
    return (
        <SimpleGrid columns={[2, 3, 4, 4]} gap={4} mt={2}>
            {dailyInsights.map((insight, index) => (
                <Box key={index} border="1px dashed" borderColor="gray.200" p={4} textAlign="center" borderRadius="l1">
                    {insight && (
                        <>
                            <Text fontSize="sm" fontWeight="light" mb={3}>
                                {insight.name}
                            </Text>
                            <Text fontSize="sm" fontWeight="bold">
                                {insight.value}
                            </Text>
                        </>
                    )}
                </Box>
            ))}
        </SimpleGrid>
    );
};
