import { Alert } from '@chakra-ui/react';

type Props = {
    result: {
        data?: {
            message?: string;
        };
        serverError?: string;
        validationErrors?: Record<string, string[] | undefined>;
    };
};

const MessageBox = ({ type, content }: { type: 'success' | 'error'; content: React.ReactNode }) =>
    type === 'success' ? (
        <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Title>{content}</Alert.Title>
        </Alert.Root>
    ) : (
        <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{content}</Alert.Title>
        </Alert.Root>
    );

export function DisplayServerActionResponse({ result }: Props) {
    const { serverError, validationErrors } = result;

    return (
        <>
            {/* {data?.message && <MessageBox type="success" content={`Success: ${data.message}`} />} */}

            {serverError && <MessageBox type="error" content={serverError} />}

            {validationErrors && (
                <MessageBox
                    type="error"
                    content={Object.keys(validationErrors).map((key) => (
                        <p key={key}>{`${key}: ${(validationErrors[key] ?? []).join(', ')}`}</p>
                    ))}
                />
            )}
        </>
    );
}
