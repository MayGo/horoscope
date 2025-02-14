import { Flex } from '@chakra-ui/react';
import { Skeleton } from '~/components/ui/skeleton';
import { HoroscopeLoader } from '../_components/HoroscopeLoader';

export default function MyHoroscopeSkeleton() {
    return (
        <Flex flexDirection="column" py={6} pt={10} justifySelf="center" w="full">
            <Flex flexDirection="column" gap={8} px={4}>
                <Skeleton height={10} mb={4} w="300px" alignSelf="center" />
                <HoroscopeLoader />
            </Flex>
        </Flex>
    );
}
