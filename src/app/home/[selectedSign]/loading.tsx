import { Skeleton, VStack } from '@chakra-ui/react';
export default function Loading() {
    return (
        <VStack alignItems="center">
            <Skeleton height="40px" width="100%" mb={10} />
            <VStack gap={4} w="full">
                <Skeleton height="20px" width="100%" />
                <Skeleton height="20px" width="100%" />
                <Skeleton height="20px" width="100%" />
                <Skeleton height="20px" width="100%" />
                <Skeleton height="20px" width="100%" />
            </VStack>

            <Skeleton height="40px" width="100%" mt={10} rounded="full" w="200px" />
        </VStack>
    );
}
