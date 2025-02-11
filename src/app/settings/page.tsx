import { Flex } from '@chakra-ui/react';
import UserSettings from './_components/UserSettings';

export default function PersonalizationSettings() {
    return (
        <Flex flexDirection="column" py={6} pt={10} w="full" justifyContent="center" alignItems="center">
            <UserSettings />
        </Flex>
    );
}
