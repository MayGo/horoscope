import { Flex } from '@chakra-ui/react';
import { Skeleton, SkeletonText } from '~/components/ui/skeleton';

export default function SettingsSkeleton() {
    return (
        <Flex flexDirection="column" py={6} pt={10} justifySelf="center" maxW="550px" w="full">
            <Flex flexDirection="column" gap={8} px={4}>
                <Skeleton height={10} mb={4} />
                <SkeletonText noOfLines={5} gap={6} />
            </Flex>
        </Flex>
    );
}
