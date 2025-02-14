'use client';

import { Box, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { HoroscopeStyle, type HoroscopeStyleType } from '~/utils/values';
import { UserSettingsSchema } from '~/validations/userSettings.validation';

const previewStyles: Record<HoroscopeStyleType, string> = {
    [HoroscopeStyle.Playful]:
        "💖 Love is totally in the air today! Whether you're spending the day with someone special or treating yourself like the star you are, today is all about good vibes, my friend! Don't forget to spread a little love around too (like, maybe a virtual high-five? 😂).",
    [HoroscopeStyle.Mystical]:
        "In the cosmic theatre of this enchanted day, the stars weave shimmering tales where ambition darts like an archer's arrow across the midnight sky. Today, your passions glow with a fiery spark. Embrace their powers, for they dance to the rhythm of your heart, resonating with vibrant joys.",
    [HoroscopeStyle.Direct]:
        'Romantic relationships could see some fireworks today. Take the time to communicate openly with your partner, as this could lead to a greater emotional connection that you have been yearning for.'
};

export const HoroscopeStylePreview = () => {
    const { watch } = useFormContext<UserSettingsSchema>();
    const selectedStyle = watch('horoscopeStyle');

    if (!selectedStyle) {
        return null;
    }

    return (
        <Box p={4} borderRadius="md" bg="blackAlpha.50" _dark={{ bg: 'whiteAlpha.50' }} w="full">
            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }} mb={2}>
                Preview of selected style:
            </Text>
            <Text fontSize="sm" fontStyle="italic">
                {previewStyles[selectedStyle as HoroscopeStyleType]}
            </Text>
        </Box>
    );
};
