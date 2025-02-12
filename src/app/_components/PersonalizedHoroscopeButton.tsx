import NextLink from 'next/link';
import { Button } from '~/components/ui/button';

export function PersonalizedHoroscopeButton() {
    return (
        <NextLink href="/personalization" passHref legacyBehavior>
            <Button variant="solid" colorScheme="yellow">
                Personalized Horoscope
            </Button>
        </NextLink>
    );
}
