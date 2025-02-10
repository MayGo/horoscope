import { Flex, Separator } from '@chakra-ui/react';
import { Hero } from './_components/Hero';

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Flex flexDirection="column" gap={6} py={6}>
            <Hero />
            <Separator my={6} />
            {children}
        </Flex>
    );
}
