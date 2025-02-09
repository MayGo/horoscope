'use client';

import { Button, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { submitUserSettings } from '~/actions/submitUserSettings';
import { Field } from '~/components/ui/field';
import { SimpleSelect } from '~/components/ui/SimpleSelect';
import { userSettingsSchema } from '~/validations/userSettings.validation';
import {
    horoscopeAgesOptions,
    horoscopeLengthsOptions,
    horoscopeSignsOptions,
    timeOfDaysOptions
} from './UserSettingsForm.utils';

// Define the form component
const UserSettingsForm = () => {
    const [formState, formAction] = useActionState(submitUserSettings, {
        success: false
    });
    const formRef = useRef<HTMLFormElement>(null);
    const { errors = {} } = formState;
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful }
    } = useForm<z.output<typeof userSettingsSchema>>({
        resolver: zodResolver(userSettingsSchema),
        defaultValues: {
            name: '',
            emailTime: 'T00_00',
            horoscopeAge: 'Today',
            horoscopeLength: 'Short',
            sign: 'Aries',
            countryOfBirth: '',
            timeOfBirth: 'T00_00',
            ...(formState?.fields ?? {})
        },
        mode: 'onTouched'
    });
    console.log(formState);
    console.log('fields returned: ', { ...(formState?.fields ?? {}) });

    useEffect(() => {
        if (isSubmitSuccessful && formState.success) {
            reset();
        }
    }, [reset, isSubmitSuccessful, formState.success]);
    return (
        <form
            ref={formRef}
            action={formAction}
            onSubmit={async (evt) => {
                evt.preventDefault();
                await handleSubmit(() => {
                    startTransition(() => formAction(new FormData(formRef.current!)));
                })(evt);
            }}
        >
            <Stack gap={4}>
                <Field
                    label="Name"
                    invalid={!!errors.name}
                    errorText={errors.name ? JSON.stringify(errors.name) : 'This field is required'}
                >
                    <Input placeholder="Enter your name" {...register('name')} />
                </Field>
                <Field
                    label="Email Time"
                    invalid={!!errors.emailTime}
                    errorText={errors.emailTime ? JSON.stringify(errors.emailTime) : 'This is an error'}
                >
                    <SimpleSelect items={timeOfDaysOptions} label="Email Time" />
                </Field>
                <Field
                    label="Horoscope Age"
                    invalid={!!errors.horoscopeAge}
                    errorText={errors.horoscopeAge ? JSON.stringify(errors.horoscopeAge) : 'This is an error'}
                >
                    <SimpleSelect items={horoscopeAgesOptions} label="Horoscope Age" />
                </Field>
                <Field
                    label="Horoscope Length"
                    invalid={!!errors.horoscopeLength}
                    errorText={errors.horoscopeLength ? JSON.stringify(errors.horoscopeLength) : 'This is an error'}
                >
                    <SimpleSelect items={horoscopeLengthsOptions} label="Horoscope Length" />
                </Field>
                <Field
                    label="Sign"
                    invalid={!!errors.sign}
                    errorText={errors.sign ? JSON.stringify(errors.sign) : 'This is an error'}
                >
                    <SimpleSelect items={horoscopeSignsOptions} label="Sign" />
                </Field>
                <Field
                    label="Country of Birth"
                    invalid={!!errors.countryOfBirth}
                    errorText={errors.countryOfBirth ? JSON.stringify(errors.countryOfBirth) : 'This field is required'}
                >
                    <Input placeholder="Enter your country of birth" {...register('countryOfBirth')} />
                </Field>
                <Field
                    label="Date of Birth"
                    invalid={!!errors.dateOfBirth}
                    errorText={errors.dateOfBirth ? JSON.stringify(errors.dateOfBirth) : 'This field is required'}
                >
                    <Input type="date" {...register('dateOfBirth')} />
                </Field>

                <Field
                    label="Time of Birth"
                    invalid={!!errors.timeOfBirth}
                    errorText={errors.timeOfBirth ? JSON.stringify(errors.timeOfBirth) : 'This is an error'}
                >
                    <SimpleSelect items={timeOfDaysOptions} label="Time of Birth" />
                </Field>
                <Button type="submit">Save Settings</Button>
            </Stack>
        </form>
    );
};

export default UserSettingsForm;
