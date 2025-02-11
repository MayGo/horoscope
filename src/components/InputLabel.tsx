'use client';

import { useFormContext } from 'react-hook-form';
import { Field } from '~/components/ui/field';

export const InputLabel = ({
    label,
    name,
    children,
    optionalText
}: {
    label: string;
    name: string;
    children: React.ReactNode;
    optionalText?: string;
}) => {
    const { getFieldState, formState } = useFormContext();
    const { invalid, error } = getFieldState(name, formState);

    return (
        <Field
            label={label}
            invalid={invalid}
            errorText={error?.message ?? 'Error in this field'}
            optionalText={optionalText}
        >
            {children}
        </Field>
    );
};
