import type { AlertRootProps } from '@chakra-ui/react';
import { Alert } from '@chakra-ui/react';

interface MessageBoxProps extends Omit<AlertRootProps, 'content'> {
    type: 'success' | 'error' | 'warning' | 'info';
    content: React.ReactNode;
}

export const MessageBox = ({ type, content }: MessageBoxProps) => (
    <Alert.Root status={type}>
        <Alert.Indicator />
        <Alert.Title>{content}</Alert.Title>
    </Alert.Root>
);
