import { Box, Flex, Heading } from '@chakra-ui/react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { MessageBox } from '~/components/MessageBox';
import { Button } from '~/components/ui/button';

export default function Personalization() {
    return (
        <Flex flexDirection="column" py={6} pt={10}>
            <Heading size="4xl" fontWeight="100" textAlign="center" pb={6}>
                My Horoscope for today
            </Heading>

            <SignedOut>
                <Box pt={10}>
                    <MessageBox type="warning" content="Please sign in to personalize your horoscope" />
                </Box>
            </SignedOut>
            <SignedIn>
                <Flex justifyContent="center" pt={10}>
                    <Link href="/settings" passHref legacyBehavior>
                        <Button>Horoscope Settings</Button>
                    </Link>
                </Flex>
            </SignedIn>
        </Flex>
    );
}
