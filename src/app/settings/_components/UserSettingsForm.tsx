'use client';

import { Heading, Input, Stack, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MessageBox } from '~/components/MessageBox';
import { Button } from '~/components/ui/button';

import { useRouter } from 'next/navigation';
import { SimpleCheckbox } from '~/components/ui/SimpleCheckbox';
import { SimpleSelect } from '~/components/ui/SimpleSelect';
import { toaster } from '~/components/ui/Toaster';
import { saveUserSettingsAction } from '~/server/actions/saveUserSettingsAction';
import { HoroscopeAge, HoroscopeLength, HoroscopeSigns, TimeOfDay } from '~/utils/values';
import { type UserSettingsSchema, userSettingsSchema } from '~/validations/userSettings.validation';
import { InputLabel } from '../../../components/InputLabel';
import { horoscopeSignsOptions, timeOfDaysOptions } from './UserSettingsForm.utils';

const defaultValues = {
    name: '',
    emailTime: TimeOfDay.T09_00,
    horoscopeAge: HoroscopeAge.Today,
    horoscopeLength: HoroscopeLength.Short,
    sign: HoroscopeSigns.Aries,
    countryOfBirth: '',
    dateOfBirth: '',
    timeOfBirth: undefined,
    sendEmailAllowed: false
};

export const UserSettingsForm = ({ data = defaultValues }: { data?: UserSettingsSchema }) => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const methods = useForm<UserSettingsSchema>({
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

    async function submitForm(data: UserSettingsSchema) {
        executeSave(data);

        router.push('/my-horoscope');
    }

    return (
        <FormProvider {...methods}>
            <form ref={formRef} onSubmit={handleSubmit(submitForm)}>
                <VStack gap={10} maxW="400px" px={4}>
                    {/* <DisplayServerActionResponse result={saveResult} /> */}

                    <Stack gap={4} w="full">
                        <Heading size="4xl" fontWeight="100" textAlign="center" pb={6}>
                            Personalization Settings
                        </Heading>
                        <InputLabel label="Name/Nickname" name="name" optionalText=" *">
                            <Input placeholder="Enter your name" {...register('name')} autoComplete="off" />
                        </InputLabel>
                        <InputLabel label="Sign" name="sign" optionalText=" *">
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
                        <Heading size="4xl" fontWeight="100" textAlign="center" pb={6}>
                            Email Settings
                        </Heading>
                        <MessageBox
                            type="info"
                            content="We will send you an email with your horoscope every day at the time you choose."
                        />
                        <SimpleCheckbox label="Send me an email with my horoscope" name="sendEmailAllowed" />
                        <InputLabel label="Send email at" name="emailTime" optionalText=" *">
                            <SimpleSelect items={timeOfDaysOptions} label="Email Time" name="emailTime" />
                        </InputLabel>
                        {/* <InputLabel label="Horoscope Age" name="horoscopeAge">
                            <SimpleSelect items={horoscopeAgesOptions} label="Horoscope Age" name="horoscopeAge" />
                        </InputLabel>
                        <InputLabel label="Horoscope Length" name="horoscopeLength">
                            <SimpleSelect
                                items={horoscopeLengthsOptions}
                                label="Horoscope Length"
                                name="horoscopeLength"
                            />
                        </InputLabel> */}
                    </Stack>

                    <Button type="submit" disabled={isSaving} variant="solid" colorScheme="yellow">
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </Button>
                </VStack>
            </form>
        </FormProvider>
    );
};
