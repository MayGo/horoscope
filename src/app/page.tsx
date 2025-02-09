import { Flex, Separator } from '@chakra-ui/react';

import { Hero } from './_components/Hero';
import { SignSelector } from './_components/SignSelector/SignSelector';

export default async function Home() {
    return (
        <Flex flexDirection="column" gap={6} py={6}>
            <Hero />
            <Separator my={6} />
            <SignSelector />
        </Flex>
    );
}
