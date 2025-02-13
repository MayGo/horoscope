'use client';

import { HStack, Input, Stack, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { SimpleSelect } from '~/components/ui/SimpleSelect';
import { toaster } from '~/components/ui/Toaster';
import { makeGeneralHoroscopeAction } from '~/server/actions/makeGeneralHoroscopeAction';
import { searchHoroscopeAction } from '~/server/actions/searchHoroscopeAction';
import { HoroscopeSigns } from '~/utils/values';
import { type HoroscopeResultsSchema } from '~/validations/horoscopeResults.validation';
import { testSettingsSchema, type TestSettingsSchema } from '~/validations/testSettings.validation';

import { InputLabel } from '~/components/InputLabel';
import { MessageBox } from '~/components/MessageBox';
import Horoscope from '../my-horoscope/Horoscope';
import { horoscopeSignsOptions } from '../settings/_components/UserSettingsForm.utils';
import { HoroscopeJSON } from './TestResult';

const defaultValues = {
    sign: HoroscopeSigns.aries,
    date: new Date().toISOString().split('T')[0] ?? ''
};

const getYesterdayDate = (date: Date) => {
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0] ?? '';
};

const getTomorrowDate = (date: Date) => {
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0] ?? '';
};

export const TestSettingsForm = ({ data = defaultValues }: { data?: TestSettingsSchema }) => {
    const [horoscope, setHoroscope] = useState<HoroscopeResultsSchema | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const methods = useForm<TestSettingsSchema>({
        mode: 'onTouched',
        resolver: zodResolver(testSettingsSchema),
        defaultValues: {
            ...data
        }
    });

    const { register, handleSubmit, getValues } = methods;

    const { execute: getHoroscope, isPending: isSaving } = useAction(makeGeneralHoroscopeAction, {
        onSuccess({ data }: { data?: HoroscopeResultsSchema }) {
            if (data) {
                console.log('data', data);
                toaster.success({
                    title: 'Success! 🎉',
                    description: `Sign: ${data.sign} Date: ${data.date}`
                });

                setHoroscope(data);
            }
        },
        onError({ error }) {
            toaster.error({
                title: 'Error',
                description: error.serverError
            });
        }
    });

    const { execute: searchHoroscope, isPending: isSearching } = useAction(searchHoroscopeAction, {
        onSuccess({ data }: { data?: HoroscopeResultsSchema }) {
            if (data) {
                toaster.success({
                    title: 'Search Successful! 🔍',
                    description: `Found results for ${data.sign} on ${data.date}`
                });
                setHoroscope(data);
            }
        },
        onError({ error }) {
            toaster.error({
                title: 'Search Error',
                description: error.serverError
            });
            setHoroscope(null);
        }
    });

    function submitForm(data: TestSettingsSchema, event: React.BaseSyntheticEvent) {
        const action = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value');

        if (action === 'search') {
            searchHoroscope(data);
        } else {
            getHoroscope(data);
        }
    }

    return (
        <>
            <FormProvider {...methods}>
                <form ref={formRef} onSubmit={(e) => handleSubmit((data) => submitForm(data, e))(e)}>
                    <VStack gap={10}>
                        <Stack gap={4} w="full">
                            <InputLabel label="Sign" name="sign">
                                <SimpleSelect items={horoscopeSignsOptions} label="Sign" name="sign" />
                            </InputLabel>

                            <InputLabel label="Date" name="date">
                                <Input type="date" {...register('date')} />
                            </InputLabel>
                        </Stack>
                        <HStack mt={2} w="full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    methods.setValue('date', getYesterdayDate(new Date(getValues('date'))));
                                    void handleSubmit((data) => searchHoroscope(data))();
                                }}
                            >
                                Previous
                            </Button>
                            <Button
                                type="submit"
                                value="search"
                                disabled={isSearching}
                                variant="solid"
                                colorScheme="blue"
                                flex={1}
                            >
                                {isSearching ? 'Searching...' : 'Search Horoscope'}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    methods.setValue('date', getTomorrowDate(new Date(getValues('date'))));
                                    void handleSubmit((data) => searchHoroscope(data))();
                                }}
                            >
                                Next
                            </Button>
                            <Button
                                type="submit"
                                value="generate"
                                disabled={isSaving}
                                variant="ghost"
                                colorScheme="yellow"
                            >
                                {isSaving ? 'Generating...' : 'Generate & Save'}
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </FormProvider>
            {horoscope ? (
                <VStack gap={4} mt={10} alignItems="flex-start">
                    <Horoscope horoscope={horoscope} />
                    <HoroscopeJSON horoscope={horoscope} />
                </VStack>
            ) : (
                <VStack gap={4} mt={10} alignItems="flex-start">
                    <MessageBox type="info" content="No horoscope found" />
                </VStack>
            )}
        </>
    );
};
