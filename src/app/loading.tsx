import { Flex, Separator } from '@chakra-ui/react';
import { SkeletonHero } from '~/components/SkeletonHero';

export default function Loading() {
    return (
        <Flex flexDirection="column" gap={6} py={6}>
            <SkeletonHero />
            <Separator my={6} />
        </Flex>
    );
}
