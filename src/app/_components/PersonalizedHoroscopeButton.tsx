import NextLink from 'next/link';
import { Button } from '~/components/ui/button';

export function PersonalizedHoroscopeButton() {
    return (
        <Button asChild variant="solid" colorScheme="yellow">
            <NextLink href="/personalization">
                Personalized Horoscope
            </NextLink>
        </Button>
    );
}
