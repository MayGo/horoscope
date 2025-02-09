import { Box, HStack, SimpleGrid } from '@chakra-ui/react';

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

export default function Navlinks() {
    return (
        <SimpleGrid columns={[1, 1]} gap="4" flex="1" maxW="500px" w="full">
            <SignedOut>
                <HStack gap={4}>
                    <SignInButton>
                        <Button colorScheme="blue">Sign In</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button variant="outline" colorScheme="blue">
                            Sign Up
                        </Button>
                    </SignUpButton>
                </HStack>
            </SignedOut>
            <SignedIn>
                <Box>
                    <UserButton />
                </Box>
            </SignedIn>
        </SimpleGrid>
    );
}
