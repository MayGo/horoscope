import { Box, Flex } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { Logo } from './Logo';
import Navlinks from './Navlinks';

export const HeaderNavbar: NextPage = () => {
    return (
        <Box as="header" borderBottom="1px solid" borderColor="mainGray" textAlign="left" py={2}>
            <Flex flexDirection={['row', 'row']} align="center" justify="space-between" gap={5} maxW="full">
                <Logo />

                <Box display={{ base: 'none', md: 'flex' }}>
                    <Navlinks />
                </Box>

                {/* <Box display={{ base: "flex", md: "none" }}>
          <MenuDialog />
        </Box> */}
            </Flex>
        </Box>
    );
};
