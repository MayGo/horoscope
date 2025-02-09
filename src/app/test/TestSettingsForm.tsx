'use client';

import { Input, Stack, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { SimpleSelect } from '~/components/ui/SimpleSelect';
import { toaster } from '~/components/ui/Toaster';
import { generateHoroscopeAction } from '~/server/actions/generateHoroscopeAction';
import { type HoroscopeResultSchema } from '~/utils/aiTexts';
import { HoroscopeSign } from '~/utils/values';
import { testSettingsSchema, type TestSettingsSchema } from '~/validations/testSettings.validation';
import { InputLabel } from '../personalization/InputLabel';
import { horoscopeSignsOptions } from '../personalization/UserSettingsForm.utils';
import { TestResult } from './TestResult';

const defaultValues = {
    sign: HoroscopeSign.Aries,
    date: '2025-02-09'
};

export const TestSettingsForm = ({ data = defaultValues }: { data?: TestSettingsSchema }) => {
    const [resultObject, setResultObject] = useState<HoroscopeResultSchema | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const methods = useForm<TestSettingsSchema>({
        mode: 'onTouched',
        resolver: zodResolver(testSettingsSchema),
        defaultValues: {
            ...data
        }
    });

    const { register, handleSubmit } = methods;

    const { execute: getHoroscope, isPending: isSaving } = useAction(generateHoroscopeAction, {
        onSuccess({ data }: { data?: HoroscopeResultSchema }) {
            if (data) {
                console.log('data', data);
                toaster.success({
                    title: 'Success! 🎉',
                    description: `Sign: ${data.sign} Date: ${data.date}`
                });

                setResultObject(data);
            }
        },
        onError({ error }) {
            toaster.error({
                title: 'Error',
                description: error.serverError
            });
        }
    });

    async function submitForm(data: TestSettingsSchema) {
        getHoroscope(data);
    }

    return (
        <>
            <FormProvider {...methods}>
                <form ref={formRef} onSubmit={handleSubmit(submitForm)}>
                    <VStack gap={10}>
                        <Stack gap={4} w="full">
                            <InputLabel label="Sign" name="sign">
                                <SimpleSelect items={horoscopeSignsOptions} label="Sign" name="sign" />
                            </InputLabel>

                            <InputLabel label="Date of Birth" name="date">
                                <Input type="date" {...register('date')} />
                            </InputLabel>
                        </Stack>
                        <Button type="submit" disabled={isSaving} variant="solid" colorScheme="yellow">
                            {isSaving ? 'Generating...' : 'Generate Horoscope'}
                        </Button>
                    </VStack>
                </form>
            </FormProvider>
            {resultObject && <TestResult resultObject={resultObject} />}
        </>
    );
};
