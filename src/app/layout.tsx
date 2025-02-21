import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { Box } from '@chakra-ui/react';
import { Footer } from '~/components/Header/Footer';
import { HeaderNavbar } from '~/components/Header/HeaderNavbar';
import { ThemeProvider } from '~/components/theme/ThemeProvider';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from '~/components/ui/Toaster';
import { getURL } from '~/utils/helpers';

const mPlusRounded = M_PLUS_Rounded_1c({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mplus',
    preload: false // Add this to prevent the font loading error
});
const meta = {
    title: 'Horoscope AI - Your Personal Astrological Guide',
    description:
        'Get personalized daily horoscopes powered by AI. Choose your style - playful, mystical, or direct - and receive custom astrological guidance tailored to your zodiac sign and preferences.',
    cardImage: '/og.png',
    robots: 'follow, index',
    favicon: '/favicon.ico',
    url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: meta.title,
        description: meta.description,
        referrer: 'origin-when-cross-origin',
        keywords: [
            'Horoscope',
            'Astrology',
            'AI Horoscope',
            'Daily Horoscope',
            'Zodiac Signs',
            'Personalized Horoscope'
        ],
        authors: [{ name: 'Horoscope AI', url: 'https://horoscope.trimatech.dev/' }],
        creator: 'Horoscope AI',
        publisher: 'Horoscope AI',
        robots: meta.robots,
        icons: { icon: meta.favicon },
        metadataBase: new URL(meta.url),
        openGraph: {
            url: meta.url,
            title: meta.title,
            description: meta.description,
            images: [meta.cardImage],
            type: 'website',
            siteName: meta.title
        },
        twitter: {
            card: 'summary_large_image',
            site: '@HoroscopeAI',
            creator: '@HoroscopeAI',
            title: meta.title,
            description: meta.description,
            images: [meta.cardImage]
        }
    };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${GeistSans.variable} ${mPlusRounded.variable}`}>
                <body className={GeistSans.className}>
                    <ThemeProvider>
                        <Box>
                            <Box maxW="1000px" mx="auto" px={[0, 2, 4]}>
                                <HeaderNavbar />

                                {children}

                                <Footer />
                            </Box>
                        </Box>
                        <Suspense>
                            <Toaster />
                        </Suspense>
                    </ThemeProvider>
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}
