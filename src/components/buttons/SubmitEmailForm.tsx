'use client';

import { useActionState, useEffect } from 'react';
import { toaster } from '../ui/Toaster';
import { SubmitEmailButton } from './SubmitEmailButton';
import { submitSendEmail } from './submitSendEmail';

export function SubmitEmailForm() {
    const [state, formAction] = useActionState(submitSendEmail, {
        error: false,
        message: ''
    });

    useEffect(() => {
        if (state?.message === '') {
            return;
        }

        if (state?.error) {
            toaster.error({
                description: state.message
            });
        } else {
            toaster.success({
                description: state.message
            });
        }
    }, [state]);

    return (
        <form action={formAction}>
            <SubmitEmailButton />
        </form>
    );
}
