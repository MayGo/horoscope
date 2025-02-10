import { type HoroscopeSignType } from '~/utils/values';
import { SignSelector } from '../_components/SignSelector/SignSelector';

export default async function SelectedSign({ params }: { params: Promise<{ selectedSign: string }> }) {
    const selectedSign = (await params).selectedSign;
    console.log('selectedSign........', selectedSign);

    return <SignSelector selectedSign={selectedSign as HoroscopeSignType} />;
}
