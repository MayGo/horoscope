import { Heading, VStack } from '@chakra-ui/react';
import { render } from '@react-email/components';
import { SubmitEmailForm } from '~/components/buttons/SubmitEmailForm';
import DailyHoroscopeEmail from '~/components/emails/DailyHoroscopeEmail';
import { getTodaysDailyHoroscope } from '~/server/redis/dailyHoroscopeKV.queries';
import { HoroscopeSigns } from '~/utils/values';

export async function EmailPreview() {
    const sign = HoroscopeSigns.aries;
    const name = 'John Doe';
    const dailyHoroscope = await getTodaysDailyHoroscope(sign);
    const emailHtml = await render(<DailyHoroscopeEmail name={name} dailyHoroscope={dailyHoroscope} />);

    return (
        <VStack gap={6} p={6} w="full">
            <Heading as="h1">Email Preview</Heading>
            <iframe
                srcDoc={emailHtml}
                width="100%"
                height="800px"
                style={{ border: '1px solid #ccc', borderRadius: '4px' }}
                content="Email Preview"
            />

            <SubmitEmailForm />
        </VStack>
    );
}
