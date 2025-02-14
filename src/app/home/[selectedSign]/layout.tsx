import { Box, Flex, Separator, SimpleGrid } from '@chakra-ui/react';
import { Hero } from '../_components/Hero';
import { SignItem } from '../_components/SignSelector/SignItem';
import { signList } from '../_components/SignSelector/SignSelector.utils';

export default async function HomeLayout({
    params,
    children
}: Readonly<{ params: Promise<{ selectedSign: string }>; children: React.ReactNode }>) {
    const selectedSign = (await params).selectedSign;

    return (
        <Flex flexDirection="column" gap={6} py={6}>
            <Hero />
            <Separator my={6} />
            <Flex flexDirection={['column']} gap={8}>
                <SimpleGrid columns={[2, 4, 6, 6]} gap={2} flex={2}>
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
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
}
