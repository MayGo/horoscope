import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Button } from "~/components/ui/button";
interface SelectedSignProps {
  name: string;
}

const forDate = "December 27, 2023";

const text = `- Today will be filled with positive energy and good luck.
- Avoid unnecessary spending and instead focus on saving or investing.
- Your leadership skills may be called upon, so stay prepared and confident.
- Finding time for exercise or meditation can help balance your energy levels.`;

export const SelectedSign: React.FC<SelectedSignProps> = ({ name }) => {
  return (
    <VStack justifyContent="space-between" height="full">
      <Flex
        justifyContent="space-between"
        justifyItems="center"
        alignItems="baseline"
        w="full"
      >
        <Heading size="3xl">{name}</Heading>
        <Text fontSize="md" fontWeight="light">
          {forDate}
        </Text>
      </Flex>
      <Text
        fontSize="md"
        fontWeight="bold"
        color="textColorGray"
        whiteSpace="pre-line"
      >
        {text}
      </Text>
      <NextLink href="/personalization" passHref legacyBehavior>
        <Button variant="outline" colorScheme="yellow">
          Personalized Horoscope
        </Button>
      </NextLink>
    </VStack>
  );
};
