import { Image } from '@chakra-ui/react';
import Link from 'next/link';

export const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
    return (
        <Link href="/" aria-label="Logo">
            <Image
                h={size === 'sm' ? '36px' : '52px'}
                flex="1"
                objectFit="contain"
                loading="lazy"
                alt=""
                src="/logo.png"
            />
        </Link>
    );
};
