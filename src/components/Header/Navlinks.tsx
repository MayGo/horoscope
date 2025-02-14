import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../ui/button';
import AdminLinks from './AdminLinks';

export default function Navlinks() {
    return (
        <SimpleGrid columns={[1, 1]} gap="4" flex="1" w="full">
            <SignedOut>
                <HStack gap={4}>
                    <SignInButton>
                        <Button>Sign In</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button variant="outline">Sign Up</Button>
                    </SignUpButton>
                </HStack>
            </SignedOut>
            <SignedIn>
                <HStack gap={4}>
                    <AdminLinks />
                    <Link href="/my-horoscope" passHref legacyBehavior>
                        <Button variant="ghost" color="black">
                            My Horoscope
                        </Button>
                    </Link>
                    <Flex boxSize={11} borderRadius="full" bg="yellow.100" alignItems="center" justifyContent="center">
                        <UserButton />
                    </Flex>
                </HStack>
            </SignedIn>
        </SimpleGrid>
    );
}
