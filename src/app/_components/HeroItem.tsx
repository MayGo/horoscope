import { Flex, Heading, Image, Text } from "@chakra-ui/react";

export const HeroItem = ({
  image,
  heading,
  description,
}: {
  image: string;
  heading: string;
  description: string;
}) => {
  return (
    <Flex flexDirection="row" gap={4}>
      <Image height="150px" width="150px" loading="lazy" alt="" src={image} />

      <Flex flexDirection="column" gap={2} justifyContent="center">
        <Heading size="3xl">{heading}</Heading>
        <Text fontSize="md" color="textColorGray" fontWeight="bold">
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};
