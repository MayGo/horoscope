import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { MessageBox } from '~/components/MessageBox';
import { HeroItem } from '../_components/HeroItem';
import UserSettings from './UserSettings';

export default function Personalization() {
    return (
        <Flex flexDirection="column" py={6} pt={10}>
            <Heading size="4xl" fontWeight="100" textAlign="center" pb={6}>
                Personalization Benefits
            </Heading>
            <SimpleGrid columns={2} gap={4}>
                <HeroItem
                    image="/personalization/birth-chart-analysis.png"
                    heading="Birth Chart Analysis"
                    description="Using the user's exact birth date, time, and location to create a highly personalized horoscope"
                />
                <HeroItem
                    image="/personalization/life-alignment.png"
                    heading="Life Alignment"
                    description="Tailoring horoscopes to align with the user's current life events and challenges"
                />
                <HeroItem
                    image="/personalization/zodiac-sign-focus.png"
                    heading="Zodiac Sign Focus"
                    description="Highlighting aspects specific to the user's sun, moon, and rising signs"
                />
                <HeroItem
                    image="/personalization/astrological-transits.png"
                    heading="Astrological Transits"
                    description="Factoring in current astrological transits and how they specifically affect the individual"
                />
            </SimpleGrid>
            <SignedOut>
                <Box pt={10}>
                    <MessageBox type="warning" content="Please sign in to personalize your horoscope" />
                </Box>
            </SignedOut>
            <SignedIn>
                <>
                    <Heading size="4xl" fontWeight="100" textAlign="center" pb={6} pt={10}>
                        Personalization Settings
                    </Heading>
                    <UserSettings />
                </>
            </SignedIn>
        </Flex>
    );
}
