import { Flex, Heading, Image, Text } from '@chakra-ui/react';

export const HeroItem = ({ image, heading, description }: { image: string; heading: string; description: string }) => {
    return (
        <Flex flexDirection="row" gap={4}>
            <Image boxSize="150px" loading="lazy" alt={heading} src={image} />

            <Flex flexDirection="column" gap={2} justifyContent="center">
                <Heading as="h3" size="3xl">
                    {heading}
                </Heading>
                <Text fontSize="md" fontWeight="medium">
                    {description}
                </Text>
            </Flex>
        </Flex>
    );
};
