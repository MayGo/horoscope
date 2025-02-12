import { Flex, Separator } from '@chakra-ui/react';
import { SkeletonHero } from '~/components/SkeletonHero';
import { Skeleton } from '~/components/ui/skeleton';

export default function Loading() {
    return (
        <Flex flexDirection="column" gap={6} pt={10}>
            <Skeleton height="40px" w="300px" mb={6} alignSelf="center" />
            <SkeletonHero />
            <Separator my={6} />
        </Flex>
    );
}
