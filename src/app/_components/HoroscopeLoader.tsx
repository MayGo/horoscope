import { Box, SimpleGrid, Skeleton, VStack } from '@chakra-ui/react';
import { SkeletonText } from '~/components/ui/skeleton';

export function HoroscopeLoader() {
    return (
        <VStack alignItems="left" px={8}>
            <Skeleton height="40px" width="100px" mb={10} />
            <SkeletonText noOfLines={3} gap={4} />
            <Skeleton height="30px" width="100px" mt={10} mb={4} />
            <SkeletonText noOfLines={3} gap={4} />
            <Skeleton height="30px" width="100px" mt={10} mb={4} />
            <SimpleGrid columns={[2, 3, 4, 4]} gap={4} justifyContent="start">
                {Array.from({ length: 12 }).map((_, index) => (
                    <Box key={index}>
                        <Skeleton height="100px" maxW="150px" />
                    </Box>
                ))}
            </SimpleGrid>
        </VStack>
    );
}
