'use client';

import { Heading, Input, Stack, Textarea, VStack } from '@chakra-ui/react';
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
import { upsertUserSettingsAction } from '~/server/actions/upsertUserSettingsAction';
import { HoroscopeAge, HoroscopeLength, HoroscopeSigns, HoroscopeStyle, TimeOfDay } from '~/utils/values';
import { type UserSettingsSchema, userSettingsSchema } from '~/validations/userSettings.validation';
import { InputLabel } from '../../../components/InputLabel';
import { horoscopeSignsOptions, horoscopeStylesOptions, timeOfDaysOptions } from '../../_components/FormOptions.utils';
import { HoroscopeStylePreview } from './HoroscopeStylePreview';

const defaultValues = {
    name: '',
    emailTime: TimeOfDay.T09_00,
    horoscopeAge: HoroscopeAge.Today,
    horoscopeLength: HoroscopeLength.Short,
    horoscopeStyle: HoroscopeStyle.Direct,
    sign: HoroscopeSigns.aries,
    countryOfBirth: '',
    dateOfBirth: '',
    timeOfBirth: undefined,
    sendEmailAllowed: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    lifeGoal: ''
};

export const UserSettingsForm = ({ data = defaultValues }: { data?: UserSettingsSchema }) => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const methods = useForm<UserSettingsSchema>({
        mode: 'onTouched',
        resolver: zodResolver(userSettingsSchema),
        defaultValues: {
            ...data,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    });

    const { register, handleSubmit } = methods;

    const { execute: executeSave, isPending: isSaving } = useAction(upsertUserSettingsAction, {
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
            <form ref={formRef} onSubmit={handleSubmit(submitForm)} style={{ width: '100%' }}>
                <VStack gap={10} w="full" px={4}>
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
                        <InputLabel label="What's your main goal in life right now?" name="lifeGoal">
                            <Textarea
                                placeholder="e.g. Adopt a healthier lifestyle. Find a loving partner. Advance in my career. Start a business. Be a better parent. Find my true calling."
                                rows={3}
                                {...register('lifeGoal')}
                            />
                        </InputLabel>
                        {/* <InputLabel label="Horoscope Age" name="horoscopeAge">
                            <SimpleSelect items={horoscopeAgesOptions} label="Horoscope Age" name="horoscopeAge" />
                        </InputLabel> */}
                        <InputLabel label="Horoscope Style" name="horoscopeStyle">
                            <SimpleSelect
                                items={horoscopeStylesOptions}
                                label="Horoscope Style"
                                name="horoscopeStyle"
                            />
                        </InputLabel>
                        <HoroscopeStylePreview />
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
                    </Stack>

                    <Button type="submit" disabled={isSaving} variant="solid" colorScheme="yellow">
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </Button>
                </VStack>
            </form>
        </FormProvider>
    );
};
