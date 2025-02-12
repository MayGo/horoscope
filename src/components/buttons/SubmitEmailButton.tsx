'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

export function SubmitEmailButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" isLoading={pending} loadingText="Sending...">
            Send Email
        </Button>
    );
}
