import { Box, Heading } from '@chakra-ui/react';
import { render } from '@react-email/components';
import DailyHoroscopeEmail from '~/components/emails/DailyHoroscopeEmail';
import { findDailyHoroscope } from '~/server/redis/redisQueries';
import { HoroscopeSigns } from '~/utils/values';

export default async function TestEmailPage() {
    const sign = HoroscopeSigns.Aries;
    const date = new Date();
    const name = 'John Doe';
    const dailyHoroscope = await findDailyHoroscope(sign, date);
    const emailHtml = await render(<DailyHoroscopeEmail name={name} dailyHoroscope={dailyHoroscope} />);
    return (
        <Box p={6}>
            <Heading as="h1" mb={4}>
                Testing Emails
            </Heading>
            <iframe
                srcDoc={emailHtml}
                width="100%"
                height="800px"
                style={{ border: '1px solid #ccc', borderRadius: '4px' }}
                title="Email Preview"
            />
        </Box>
    );
}
