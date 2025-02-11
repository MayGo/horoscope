import { Box } from '@chakra-ui/react';
import { MessageBox } from './MessageBox';

export const UnauthorizedMessage = () => (
    <Box py={10}>
        <MessageBox type="error" content="You are not authorized to access this page" />
    </Box>
);
