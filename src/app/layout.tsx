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

const mPlusRounded = M_PLUS_Rounded_1c({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mplus',
    preload: false // Add this to prevent the font loading error
});

export const metadata: Metadata = {
    title: 'Horoscope',
    description: 'Horoscope App',
    icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

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
