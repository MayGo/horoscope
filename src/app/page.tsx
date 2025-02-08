import { api, HydrateClient } from "~/trpc/server";

import { Flex } from "@chakra-ui/react";

import { Hero } from "./_components/Hero";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Flex flexDirection="column" gap={6} pt={6}>
        <Hero />
      </Flex>
    </HydrateClient>
  );
}
