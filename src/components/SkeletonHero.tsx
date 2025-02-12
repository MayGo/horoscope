import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { Skeleton, SkeletonText } from './ui/skeleton';

const SkeletonHeroItem = () => {
    return (
        <Flex flexDirection="row" gap={4}>
            <Box boxSize="150px" display="flex" alignItems="center" justifyContent="center">
                <Skeleton boxSize="120px" rounded="2xl" />
            </Box>

            <Flex flexDirection="column" gap={2} justifyContent="center" w="full">
                <Skeleton height={10} mb={4} />
                <SkeletonText noOfLines={3} gap={2} />
            </Flex>
        </Flex>
    );
};

export const SkeletonHero = () => {
    return (
        <SimpleGrid columns={[1, 1, 1, 2]} gap={4}>
            <SkeletonHeroItem />
            <SkeletonHeroItem />
            <SkeletonHeroItem />
            <SkeletonHeroItem />
        </SimpleGrid>
    );
};
