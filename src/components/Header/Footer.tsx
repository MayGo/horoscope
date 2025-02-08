import { Box, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { Logo } from "./Logo";

import {
  PRIVACY_POLICY_LINK,
  TERMS_AND_CONDITIONS_LINK,
} from "~/utils/constants";

export const Footer: NextPage = () => {
  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor="mainGray"
      w="full"
      mt={6}
    >
      <Flex
        flexDirection={["column", "column", "column", "row"]}
        justifyContent="space-between"
        alignItems="center"
        w="full"
        h="full"
      >
        <Logo size="sm" />

        <Flex gap={6} py={[4, 4, 4, 8]}>
          <NextLink href={PRIVACY_POLICY_LINK} passHref>
            <Text textStyle="sm" fontWeight="bold">
              Privacy Policy
            </Text>
          </NextLink>
          <NextLink href={TERMS_AND_CONDITIONS_LINK} passHref>
            <Text textStyle="sm" fontWeight="bold">
              Terms of service
            </Text>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
};
