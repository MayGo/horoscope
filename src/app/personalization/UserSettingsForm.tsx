'use client';

import { Button, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Field } from '~/components/ui/field';
import { SimpleSelect } from '~/components/ui/SimpleSelect';
import { HoroscopeAge, HoroscopeLength, HoroscopeSign, TimeOfDay } from './enums';
import {
    horoscopeAgesOptions,
    horoscopeLengthsOptions,
    horoscopeSignsOptions,
    timeOfDaysOptions
} from './UserSettingsForm.utils';
// Define the Zod schema for form validation
const userSettingsSchema = z.object({
    name: z.string().optional(),
    emailTime: z.nativeEnum(TimeOfDay).optional(),
    horoscopeAge: z.nativeEnum(HoroscopeAge).optional(),
    horoscopeLength: z.nativeEnum(HoroscopeLength).optional(),
    sign: z.nativeEnum(HoroscopeSign).optional(),
    countryOfBirth: z.string().optional(),
    dateOfBirth: z.date().optional(),
    timeOfBirth: z.nativeEnum(TimeOfDay).optional()
});

// Define the form component
const UserSettingsForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(userSettingsSchema)
    });

    const onSubmit = (data: z.infer<typeof userSettingsSchema>) => {
        console.log(data);
        // Add server action call here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
                <Field
                    label="Name"
                    invalid={!!errors.name}
                    errorText={errors.name ? JSON.stringify(errors.name.message) : 'This field is required'}
                >
                    <Input placeholder="Enter your name" {...register('name')} />
                </Field>
                <Field
                    label="Email Time"
                    invalid={!!errors.emailTime}
                    errorText={errors.emailTime ? JSON.stringify(errors.emailTime.message) : 'This is an error'}
                >
                    <SimpleSelect items={timeOfDaysOptions} label="Email Time" />
                </Field>
                <Field
                    label="Horoscope Age"
                    invalid={!!errors.horoscopeAge}
                    errorText={errors.horoscopeAge ? JSON.stringify(errors.horoscopeAge.message) : 'This is an error'}
                >
                    <SimpleSelect items={horoscopeAgesOptions} label="Horoscope Age" />
                </Field>
                <Field
                    label="Horoscope Length"
                    invalid={!!errors.horoscopeLength}
                    errorText={
                        errors.horoscopeLength ? JSON.stringify(errors.horoscopeLength.message) : 'This is an error'
                    }
                >
                    <SimpleSelect items={horoscopeLengthsOptions} label="Horoscope Length" />
                </Field>
                <Field
                    label="Sign"
                    invalid={!!errors.sign}
                    errorText={errors.sign ? JSON.stringify(errors.sign.message) : 'This is an error'}
                >
                    <SimpleSelect items={horoscopeSignsOptions} label="Sign" />
                </Field>
                <Field
                    label="Country of Birth"
                    invalid={!!errors.countryOfBirth}
                    errorText={
                        errors.countryOfBirth ? JSON.stringify(errors.countryOfBirth.message) : 'This field is required'
                    }
                >
                    <Input placeholder="Enter your country of birth" {...register('countryOfBirth')} />
                </Field>
                <Field
                    label="Date of Birth"
                    invalid={!!errors.dateOfBirth}
                    errorText={
                        errors.dateOfBirth ? JSON.stringify(errors.dateOfBirth.message) : 'This field is required'
                    }
                >
                    <Input type="date" {...register('dateOfBirth')} />
                </Field>

                <Field
                    label="Time of Birth"
                    invalid={!!errors.timeOfBirth}
                    errorText={errors.timeOfBirth ? JSON.stringify(errors.timeOfBirth.message) : 'This is an error'}
                >
                    <SimpleSelect items={timeOfDaysOptions} label="Time of Birth" />
                </Field>
                <Button type="submit">Save Settings</Button>
            </Stack>
        </form>
    );
};

export default UserSettingsForm;
