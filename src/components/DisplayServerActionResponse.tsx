import { MessageBox } from './MessageBox';

type Props = {
    result: {
        data?: {
            message?: string;
        };
        serverError?: string;
        validationErrors?: Record<string, string[] | undefined>;
    };
};

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
