import { Flex } from '@chakra-ui/react';
import UserSettings from './_components/UserSettings';

export default async function PersonalizationSettings() {
    return (
        <Flex flexDirection="column" py={6} pt={10} justifySelf="center" maxW="md">
            <UserSettings />
        </Flex>
    );
}
