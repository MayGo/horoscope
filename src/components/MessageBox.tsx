import { Alert } from '@chakra-ui/react';

export const MessageBox = ({ type, content }: { type: 'success' | 'error' | 'warning'; content: React.ReactNode }) => (
    <Alert.Root status={type}>
        <Alert.Indicator />
        <Alert.Title>{content}</Alert.Title>
    </Alert.Root>
);
