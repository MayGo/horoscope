import { Box, Skeleton } from '@chakra-ui/react';

export const LoadingSkeleton = () => (
    <Box py={10}>
        <Skeleton height="400px" width="100%" />
    </Box>
);
