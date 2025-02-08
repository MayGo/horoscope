import { api, HydrateClient } from "~/trpc/server";

import { Flex, Separator } from "@chakra-ui/react";

import { Hero } from "./_components/Hero";
import { SignSelector } from "./_components/SignSelector/SignSelector";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Flex flexDirection="column" gap={6} py={6}>
        <Hero />
        <Separator my={6} />
        <SignSelector />
      </Flex>
    </HydrateClient>
  );
}
