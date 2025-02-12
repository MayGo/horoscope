import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { HeroItem } from '../home/_components/HeroItem';

export default async function Personalization() {
    return (
        <Flex flexDirection="column" py={6} pt={10}>
            <Heading size="4xl" fontWeight="100" textAlign="center" pb={10}>
                Personalization Benefits
            </Heading>
            <SimpleGrid columns={[1, 1, 1, 2]} gap={4}>
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

            <Flex justifyContent="center" pt={10}>
                <SignedIn>
                    <Link href="/settings" passHref legacyBehavior>
                        <Button>Personalize Your Horoscope</Button>
                    </Link>
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <Button>Sign In to Personalize Your Horoscope</Button>
                    </SignInButton>
                </SignedOut>
            </Flex>
        </Flex>
    );
}
