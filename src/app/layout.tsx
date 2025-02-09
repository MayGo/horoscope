import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { Box } from '@chakra-ui/react';
import { Footer } from '~/components/Header/Footer';
import { HeaderNavbar } from '~/components/Header/HeaderNavbar';
import { ThemeProvider } from '~/components/theme/ThemeProvider';
import { TRPCReactProvider } from '~/trpc/react';

import { ClerkProvider } from '@clerk/nextjs';
import { M_PLUS_Rounded_1c, Roboto } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from '~/components/ui/Toaster';

const roboto = Roboto({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto'
});

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
            <html lang="en" className={`${roboto.variable} ${mPlusRounded.variable}`}>
                <body className={GeistSans.className}>
                    <ThemeProvider>
                        <TRPCReactProvider>
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
                        </TRPCReactProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
