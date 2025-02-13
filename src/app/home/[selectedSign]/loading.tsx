import { SimpleGrid, Skeleton, VStack } from '@chakra-ui/react';
import { SkeletonText } from '~/components/ui/skeleton';

export default function SelectedSignLoading() {
    return (
        <VStack alignItems="left" px={8}>
            <Skeleton height="40px" width="100px" mb={10} />
            <SkeletonText noOfLines={3} gap={4} />
            <Skeleton height="30px" width="100px" mt={10} mb={4} />
            <SkeletonText noOfLines={3} gap={4} />
            <Skeleton height="30px" width="100px" mt={10} mb={4} />
            <SimpleGrid columns={[2, 3, 3]} gap={4} maxW="550px">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} height="100px" width="100%" />
                ))}
            </SimpleGrid>
        </VStack>
    );
}
