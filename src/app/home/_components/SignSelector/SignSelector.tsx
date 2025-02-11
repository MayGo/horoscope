import { Box, Flex, Image, SimpleGrid } from '@chakra-ui/react';
import { type HoroscopeSignType } from '~/utils/values';
import { SelectedSign } from './SelectedSign';
import { SignItem } from './SignItem';
import { signList } from './SignSelector.utils';

export function SignSelector({ selectedSign }: { selectedSign?: HoroscopeSignType }) {
    return (
        <Flex flexDirection={['column', 'column', 'column', 'row']} gap={8}>
            <SimpleGrid columns={[2, 3, 4, 4]} gap={2} flex={2}>
                {signList.map((sign) => (
                    <SignItem
                        key={sign.name}
                        name={sign.name}
                        dateRange={sign.dateRange}
                        image={sign.image}
                        isSelected={selectedSign === sign.name}
                    />
                ))}
            </SimpleGrid>
            <Box flex={1.5} alignSelf="stretch">
                {selectedSign ? <SelectedSign name={selectedSign} /> : <Image src="/astrology.png" alt="placeholder" />}
            </Box>
        </Flex>
    );
}
