import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { HeroItem } from "../_components/HeroItem";
import UserSettingsForm from "./UserSettingsForm";

export default function Personalization() {
  return (
    <Flex flexDirection="column" gap={6} py={6}>
      <Heading size="4xl" fontWeight="100" textAlign="center">
        Personalization Benefits
      </Heading>
      <SimpleGrid columns={2} gap={4}>
        <HeroItem
          image="/personalization/birth-chart-analysis.png"
          heading="Birth Chart Analysis"
          description="Using the user's exact birth date, time, and location to create a highly personalized horoscope"
        />
        <HeroItem
          image="/personalization/life-alignment.png"
          heading="Life Alignment"
          description="Tailoring horoscopes to align with the user's current life events and challenges"
        />
        <HeroItem
          image="/personalization/zodiac-sign-focus.png"
          heading="Zodiac Sign Focus"
          description="Highlighting aspects specific to the user's sun, moon, and rising signs"
        />
        <HeroItem
          image="/personalization/astrological-transits.png"
          heading="Astrological Transits"
          description="Factoring in current astrological transits and how they specifically affect the individual"
        />
      </SimpleGrid>
      <UserSettingsForm />
    </Flex>
  );
}
