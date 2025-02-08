"use client";

import { Box, HStack, Image, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { SelectedSign } from "./SelectedSign";
import { SignItem } from "./SignItem";
import { type SelectedSignItem, signList } from "./SignSelector.utils";

export const SignSelector: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<SelectedSignItem | null>(
    null
  );

  return (
    <HStack gap={8}>
      <SimpleGrid columns={4} gap={2} flex={2}>
        {signList.map((sign) => (
          <SignItem
            key={sign.name}
            name={sign.name}
            dateRange={sign.dateRange}
            image={sign.image}
            onClick={() => setSelectedSign(sign)}
            isSelected={selectedSign?.name === sign.name}
          />
        ))}
      </SimpleGrid>
      <Box flex={1.5} alignSelf="stretch">
        {selectedSign ? (
          <SelectedSign {...selectedSign} />
        ) : (
          <Image src="/astrology.png" alt="placeholder" />
        )}
      </Box>
    </HStack>
  );
};
