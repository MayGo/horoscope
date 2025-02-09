'use client';

import { Box, Heading, Text } from '@chakra-ui/react';
import { type HoroscopeResultSchema } from '~/utils/aiTexts';

export const TestResult = ({ resultObject }: { resultObject: HoroscopeResultSchema }) => {
    return (
        <Box mt={6}>
            <Heading as="h2" size="md" mb={2}>
                Response:
            </Heading>
            <Text whiteSpace="pre-wrap">{JSON.stringify(resultObject, null, 2)}</Text>
        </Box>
    );
};
