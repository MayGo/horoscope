import { SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link";

import { LOGIN_LINK } from "~/utils/constants";
import { Button } from "../ui/button";

export default function Navlinks() {
  return (
    <SimpleGrid columns={[1, 1]} gap="4" flex="1" maxW="500px" w="full">
      <NextLink href={LOGIN_LINK} passHref legacyBehavior>
        <Button as="a" variant="outline" w="full" colorPalette="yellow">
          Sign In
        </Button>
      </NextLink>
    </SimpleGrid>
  );
}
