'use client';

import { Box, Heading, Text } from '@chakra-ui/react';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';

export const HoroscopeJSON = ({ horoscope }: { horoscope: HoroscopeResultsSchema }) => {
    return (
        <Box mt={6}>
            <Heading as="h2" size="md" mb={2}>
                Response:
            </Heading>
            <Text whiteSpace="pre-wrap">{JSON.stringify(horoscope, null, 4)}</Text>
        </Box>
    );
};
