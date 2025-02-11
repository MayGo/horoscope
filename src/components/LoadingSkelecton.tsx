import { Box, Skeleton } from '@chakra-ui/react';

export const LoadingSkeleton = () => (
    <Box py={10}>
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
    </Box>
);
