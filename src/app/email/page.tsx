import { Heading, VStack } from '@chakra-ui/react';
import { render } from '@react-email/components';
import { SubmitEmailForm } from '~/components/buttons/SubmitEmailForm';
import DailyHoroscopeEmail from '~/components/emails/DailyHoroscopeEmail';
import { UnauthorizedMessage } from '~/components/UnauthorizedMessage';
import { checkIsAdmin } from '~/server/clerk/clerkQueries';
import { getTodaysDailyHoroscope } from '~/server/redis/dailyHoroscopeKV.queries';
import { HoroscopeSigns } from '~/utils/values';

export default async function TestEmailPage() {
    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
        return <UnauthorizedMessage />;
    }

    const sign = HoroscopeSigns.aries;
    const name = 'John Doe';
    const dailyHoroscope = await getTodaysDailyHoroscope(sign);
    const emailHtml = await render(<DailyHoroscopeEmail name={name} dailyHoroscope={dailyHoroscope} />);

    return (
        <VStack gap={6} p={6}>
            <Heading as="h1">Testing Emails</Heading>

            <SubmitEmailForm />

            <iframe
                srcDoc={emailHtml}
                width="100%"
                height="800px"
                style={{ border: '1px solid #ccc', borderRadius: '4px' }}
                content="Email Preview"
            />
        </VStack>
    );
}
