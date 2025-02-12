import { Image } from '@chakra-ui/react';
import { HoroscopeSigns, type HoroscopeSignType } from '~/utils/values';
import { SelectedSign } from '../_components/SignSelector/SelectedSign';

export default async function SelectedSignPage({ params }: { params: Promise<{ selectedSign: string }> }) {
    const selectedSign = (await params).selectedSign;
    console.log('selectedSign in page........', selectedSign);

    if (!Object.values(HoroscopeSigns).includes(selectedSign as HoroscopeSignType)) {
        return <Image src="/astrology.png" alt="placeholder" />;
    }

    return <SelectedSign name={selectedSign as HoroscopeSignType} />;
}
