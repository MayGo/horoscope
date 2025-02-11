import { Box, Heading, List, ListItem, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import type { DailyInsightSchema, HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';

export default function Horoscope({ dailyHoroscope }: { dailyHoroscope: HoroscopeResultsSchema }) {
    return (
        <VStack gap={6} alignItems="flex-start">
            <Text fontSize="md">
                For<Text as="b"> {dailyHoroscope.sign}</Text> on <Text as="b">{dailyHoroscope.date}</Text>:
            </Text>

            <List.Root gap={4}>
                {dailyHoroscope.horoscopes.map((item) => (
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
                {dailyHoroscope.affirmations.map((affirmation) => (
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
            <DailyInsights dailyInsights={dailyHoroscope.dailyInsights} />
        </VStack>
    );
}

const DailyInsights = ({ dailyInsights }: { dailyInsights: DailyInsightSchema[] }) => {
    return (
        <SimpleGrid columns={[2, 3, 3]} gap={4} maxW="550px" mt={2}>
            {dailyInsights.map((insight, index) => (
                <Box key={index} border="1px dashed" borderColor="gray.200" p={4} textAlign="center">
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
