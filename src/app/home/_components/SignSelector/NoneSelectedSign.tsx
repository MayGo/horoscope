import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import { PersonalizedHoroscopeButton } from '~/app/_components/PersonalizedHoroscopeButton';
export function NoneSelectedSign() {
    return (
        <Flex gap={10} flexDirection={['column', 'column', 'row']} alignItems={'center'} justifyContent={'center'}>
            <Image height={'300px'} src="/astrology.png" alt="placeholder" />
            <VStack gap={4}>
                <Text maxW={'300px'} fontSize="2xl" fontWeight="bold" textAlign={'center'}>
                    Select a sign to view Daily Horoscope
                </Text>
                <PersonalizedHoroscopeButton />
            </VStack>
        </Flex>
    );
}
