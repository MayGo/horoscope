'use client';

import { Input, Stack, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRef } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { type z } from 'zod';
import { Button } from '~/components/ui/button';
import { Field } from '~/components/ui/field';
import { SimpleSelect } from '~/components/ui/SimpleSelect';
import { toaster } from '~/components/ui/Toaster';
import { saveUserSettingsAction } from '~/server/actions/saveUserSettingsAction';
import { HoroscopeAge, HoroscopeLength, HoroscopeSign, TimeOfDay } from '~/utils/values';
import { userSettingsSchema } from '~/validations/userSettings.validation';
import {
    horoscopeAgesOptions,
    horoscopeLengthsOptions,
    horoscopeSignsOptions,
    timeOfDaysOptions
} from './UserSettingsForm.utils';

const InputLabel = ({ label, name, children }: { label: string; name: string; children: React.ReactNode }) => {
    const { getFieldState, formState } = useFormContext();
    const { invalid, error } = getFieldState(name, formState);

    return (
        <Field label={label} invalid={invalid} errorText={error?.message ?? 'Error in this field'}>
            {children}
        </Field>
    );
};

const defaultValues = {
    name: '',
    emailTime: TimeOfDay.T00_00,
    horoscopeAge: HoroscopeAge.Today,
    horoscopeLength: HoroscopeLength.Short,
    sign: HoroscopeSign.Aries,
    countryOfBirth: '',
    dateOfBirth: '',
    timeOfBirth: TimeOfDay.T00_00
};

export const UserSettingsForm = ({ data = defaultValues }: { data?: z.infer<typeof userSettingsSchema> }) => {
    const formRef = useRef<HTMLFormElement>(null);

    const methods = useForm<z.output<typeof userSettingsSchema>>({
        mode: 'onTouched',
        resolver: zodResolver(userSettingsSchema),
        defaultValues: {
            ...data
        }
    });

    const { register, handleSubmit } = methods;

    const { execute: executeSave, isPending: isSaving } = useAction(saveUserSettingsAction, {
        onSuccess({ data }: { data?: { message: string } }) {
            if (data?.message) {
                toaster.success({
                    title: 'Success! 🎉',
                    description: data.message
                });
            }
        },
        onError({ error }) {
            toaster.error({
                title: 'Error',
                description: error.serverError
            });
        }
    });

    async function submitForm(data: z.output<typeof userSettingsSchema>) {
        executeSave(data);
    }

    return (
        <FormProvider {...methods}>
            <form ref={formRef} onSubmit={handleSubmit(submitForm)}>
                <VStack gap={10}>
                    {/* <DisplayServerActionResponse result={saveResult} /> */}
                    <Stack direction="row" gap={10} w="full">
                        <Stack gap={4} w="full">
                            <InputLabel label="Name" name="name">
                                <Input placeholder="Enter your name" {...register('name')} autoComplete="off" />
                            </InputLabel>
                            <InputLabel label="Sign" name="sign">
                                <SimpleSelect items={horoscopeSignsOptions} label="Sign" name="sign" />
                            </InputLabel>

                            <InputLabel label="Country of Birth" name="countryOfBirth">
                                <Input placeholder="Enter your country of birth" {...register('countryOfBirth')} />
                            </InputLabel>
                            <InputLabel label="Date of Birth" name="dateOfBirth">
                                <Input type="date" {...register('dateOfBirth')} />
                            </InputLabel>
                            <InputLabel label="Time of Birth" name="timeOfBirth">
                                <SimpleSelect items={timeOfDaysOptions} label="Time of Birth" name="timeOfBirth" />
                            </InputLabel>
                        </Stack>
                        <Stack gap={4} w="full">
                            <InputLabel label="Email Time" name="emailTime">
                                <SimpleSelect items={timeOfDaysOptions} label="Email Time" name="emailTime" />
                            </InputLabel>
                            <InputLabel label="Horoscope Age" name="horoscopeAge">
                                <SimpleSelect items={horoscopeAgesOptions} label="Horoscope Age" name="horoscopeAge" />
                            </InputLabel>
                            <InputLabel label="Horoscope Length" name="horoscopeLength">
                                <SimpleSelect
                                    items={horoscopeLengthsOptions}
                                    label="Horoscope Length"
                                    name="horoscopeLength"
                                />
                            </InputLabel>
                        </Stack>
                    </Stack>
                    <Button type="submit" disabled={isSaving} variant="solid" colorScheme="yellow">
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </Button>
                </VStack>
            </form>
        </FormProvider>
    );
};
