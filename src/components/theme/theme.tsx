'use client';

import { createSystem, defaultSystem, defineConfig } from '@chakra-ui/react';

const primaryColor = '#2563EB';
export const bgColorTransparent = 'rgba(238, 242, 255, 0.8)';
export const bgColorWhiteTransparent = 'rgba(255, 255, 255, 0.8)';
const mainGray = '#3B3B3B';
const textColor = mainGray;
const textColorGray = '#6C6969';
const borderColor = '#84B2FE';
const shadowColor = '#D1DCFF';
const yellowColor = '#FFD646';
const yellowColorBg = '#FFFAEF';

const config = defineConfig({
    ...defaultSystem._config,
    globalCss: {
        html: {
            colorPalette: 'yellow',
            scrollBehavior: 'smooth !important'
        }
    },
    theme: {
        ...defaultSystem._config.theme,

        tokens: {
            ...defaultSystem._config.theme?.tokens,

            colors: {
                ...defaultSystem._config.theme?.tokens?.colors,

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
                }
            },
            fonts: {
                body: { value: 'var(--font-roboto), sans-serif' },
                heading: { value: 'var(--font-mplus), sans-serif' }
            }
        }
    }
});

export const sytemTheme = createSystem(config);
