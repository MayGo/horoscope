import { Box, Image, Text, VStack } from "@chakra-ui/react";

interface SignItemProps {
  name: string;
  dateRange: string;
  image: string;
  onClick: () => void;
  isSelected: boolean;
}

export const SignItem: React.FC<SignItemProps> = ({
  name,
  dateRange,
  image,
  onClick,
  isSelected,
}) => {
  return (
    <VStack
      as="button"
      onClick={onClick}
      borderWidth={1}
      borderRadius="2xl"
      borderColor={isSelected ? "yellowColor" : "transparent"}
      bg={isSelected ? "yellowColorBg" : "transparent"}
      _hover={{ bg: "yellowColorBg", borderColor: "transparent" }}
      gap={0}
      pb={2}
    >
      <Box>
        <Image src={image} alt={name} w="80px" h="80px" />
      </Box>
      <Text fontSize="xl" fontWeight="bold">
        {name}
      </Text>
      <Text fontSize="xx-small" fontWeight="bold">
        {dateRange}
      </Text>
    </VStack>
  );
};
