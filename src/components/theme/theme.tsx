'use client';
import { createSystem, defaultConfig, defineConfig, mergeConfigs } from '@chakra-ui/react';
import { mainGray } from './theme.utils';

const primaryColor = '#2563EB';
export const bgColorTransparent = 'rgba(238, 242, 255, 0.8)';
export const bgColorWhiteTransparent = 'rgba(255, 255, 255, 0.8)';

const textColorGray = '#6C6969';
const borderColor = '#84B2FE';
const shadowColor = '#D1DCFF';
const yellowColor = '#FFD646';
const yellowColorBg = '#FFFAEF';

const myConfig = defineConfig({
    globalCss: {
        html: {
            colorPalette: 'yellow',
            scrollBehavior: 'smooth !important',
            color: mainGray,
            '--chakra-radii-l1': 'xl',
            '--chakra-radii-l2': '2xl',
            '--chakra-radii-l3': 'xl'
        }
    },
    theme: {
        tokens: {
            colors: {
                primary: {
                    value: primaryColor
                },
                black: {
                    value: '#000000'
                },
                textColorGray: {
                    value: textColorGray
                },
                yellowColor: {
                    value: yellowColor
                },
                yellowColorBg: {
                    value: yellowColorBg
                },
                mainGray: {
                    value: mainGray
                },
                bgColor: {
                    value: bgColorTransparent
                },
                borderColor: {
                    value: borderColor
                },
                shadowColor: {
                    value: shadowColor
                },
                bgColorWhiteTransparent: {
                    value: bgColorWhiteTransparent
                },
                yellow: {
                    '50': { value: '#fefbe8' },
                    '100': { value: '#fff8c2' },
                    '200': { value: '#ffec89' },
                    '300': { value: '#ffdb49' },
                    '400': { value: '#fdc512' },
                    '500': { value: '#ecab06' },
                    '600': { value: '#cc8302' },
                    '700': { value: '#a35c05' },
                    '800': { value: '#86480d' },
                    '900': { value: '#723b11' },
                    '950': { value: '#431e05' }
                }
            },
            fonts: {
                body: { value: 'var(--font-geist-sans), sans-serif' },
                heading: { value: 'var(--font-mplus), sans-serif' }
            }
        },
        semanticTokens: {
            radii: {
                l1: { value: '{radii.2xl}' },
                l2: { value: '{radii.2xl}' },
                l3: { value: '{radii.2xl}' }
            }
        }
        // recipes: {
        //     Button: {
        //         variants: {
        //             variant: {
        //                 custom: {
        //                     borderRadius: 'full',
        //                     bg: 'blue',
        //                     color: 'white',
        //                     textTransform: 'uppercase'
        //                 }
        //             }
        //         }
        //     }
        // }
    }
});

const config = mergeConfigs(defaultConfig, myConfig);

export const sytemTheme = createSystem(config);
