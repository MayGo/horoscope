import { Box, Heading } from '@chakra-ui/react';
import { TestSettingsForm } from './TestSettingsForm';
// o3-mini       $1.10 / 1M input tokens, $4.40 / 1M output** tokens
// o1            $15.00 / 1M input tokens, $60.00 / 1M output tokens
// gpt-4o        $2.50 / 1M input tokens, $10.00 / 1M output tokens
// gpt-4o-mini   $0.150 / 1M input tokens, $0.600 / 1M output tokens
// gpt-3.5-turbo $0.50 / 1M input tokens, $1.50 / 1M output tokens

export const dynamic = 'force-dynamic';
/*
Structured outputs:
o3-mini-2025-1-31 and later
o1-2024-12-17 and later
gpt-4o-mini-2024-07-18 and later
gpt-4o-2024-08-06 and later


Cache:
gpt-4o (excludes gpt-4o-2024-05-13 and chatgpt-4o-latest)	
gpt-4o-mini	
gpt-4o-realtime-preview	
o1-preview	
o1-mini
*/

export default function TestPage() {
    return (
        <Box p={6}>
            <Heading as="h1" mb={4}>
                Testing Horoscope
            </Heading>
            <TestSettingsForm />
        </Box>
    );
}
