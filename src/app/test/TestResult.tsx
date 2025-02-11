'use client';

import { Box, Heading, Text } from '@chakra-ui/react';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';

export const TestResult = ({ resultObject }: { resultObject: HoroscopeResultsSchema }) => {
    return (
        <Box mt={6}>
            <Heading as="h2" size="md" mb={2}>
                Response:
            </Heading>
            <Text whiteSpace="pre-wrap">{JSON.stringify(resultObject, null, 2)}</Text>
        </Box>
    );
};
