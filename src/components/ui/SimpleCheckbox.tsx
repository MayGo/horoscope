'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { CheckboxBase } from './checkbox';

export const SimpleCheckbox = ({ label, name }: { label: string; name: string }) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <CheckboxBase
                    name={field.name}
                    checked={field.value as boolean}
                    onCheckedChange={(details) => {
                        field.onChange(details.checked);
                    }}
                >
                    {label}
                </CheckboxBase>
            )}
        />
    );
};
