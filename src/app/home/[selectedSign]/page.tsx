import { HoroscopeSigns, type HoroscopeSignType } from '~/utils/values';
import { NoneSelectedSign } from '../_components/SignSelector/NoneSelectedSign';
import { SelectedSign } from '../_components/SignSelector/SelectedSign';

export default async function SelectedSignPage({ params }: { params: Promise<{ selectedSign: string }> }) {
    const selectedSign = (await params).selectedSign;

    if (!Object.values(HoroscopeSigns).includes(selectedSign as HoroscopeSignType)) {
        return <NoneSelectedSign />;
    }

    return <SelectedSign name={selectedSign as HoroscopeSignType} />;
}
