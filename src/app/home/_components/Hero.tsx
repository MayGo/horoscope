import { SimpleGrid } from '@chakra-ui/react';
import { HeroItem } from './HeroItem';

export const Hero = () => {
    return (
        <SimpleGrid columns={[1, 1, 1, 2]} gap={4}>
            <HeroItem
                image="/mind-power.png"
                heading="Mind Power"
                description="Horoscopes can positively influence one's mindset, offering guidance and perspective"
            />
            <HeroItem
                image="/daily-guidance.png"
                heading="Daily Guidance"
                description="Receiving personalized insights at a chosen time each day can provide a sense of routine and mindfulness"
            />
            <HeroItem
                image="/tailored-advice.png"
                heading="Tailored Advice"
                description="Horoscopes can positively influence one's mindset, offering guidance and perspective"
            />
            <HeroItem
                image="/emotional-support.png"
                heading="Emotional Support"
                description="Horoscopes can positively influence one's mindset, offering guidance and perspective"
            />
        </SimpleGrid>
    );
};
