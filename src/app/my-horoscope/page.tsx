import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import { SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import { ClientRedirectHandler } from '~/components/client-redirect-handler';
import { MessageBox } from '~/components/MessageBox';
import { Button } from '~/components/ui/button';
import { getMySettings } from '~/server/db/queries';
import { findMyDailyHoroscope } from '~/server/redis/userHoroscopeKV.queries';
import { capitalize } from '~/utils/string.utils';
import Horoscope from '../_components/Horoscope';

export default async function Personalization() {
    const mySettings = await getMySettings();

    if (!mySettings?.sign) {
        console.info('No settings found. Redirecting to settings.');
        return <ClientRedirectHandler path="/settings" />;
    }

    const dailyHoroscope = await findMyDailyHoroscope();
    const showWarning = dailyHoroscope?.sign?.toLowerCase() !== mySettings.sign.toLowerCase();

    return (
        <VStack p={6} pt={10} alignItems="center">
            <Heading size="4xl" fontWeight="100" textAlign="center" pb={10}>
                My horoscope for today
            </Heading>

            <VStack>
                {showWarning && (
                    <Box mb={6}>
                        <MessageBox
                            type="warning"
                            content={`Your horoscope is not up to date. New horoscope is generated for ${capitalize(mySettings?.sign)} tomorrow!`}
                        />
                    </Box>
                )}
                {dailyHoroscope ? (
                    <Horoscope horoscope={dailyHoroscope} />
                ) : (
                    <MessageBox type="warning" content="No horoscope found for today. Please check back later." />
                )}
            </VStack>

            <SignedIn>
                <Flex justifyContent="center" pt={10}>
                    <Link href="/settings" passHref legacyBehavior>
                        <Button>Personal Horoscope Settings</Button>
                    </Link>
                </Flex>
            </SignedIn>
        </VStack>
    );
}
