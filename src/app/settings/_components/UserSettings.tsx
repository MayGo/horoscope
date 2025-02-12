import { MessageBox } from '~/components/MessageBox';
import { getMySettings } from '~/server/db/queries';
import { UserSettingsForm } from './UserSettingsForm';

export default async function UserSettings() {
    const settings = await getMySettings();

    if (!settings) {
        return <MessageBox type="error" content="No settings found" />;
    }

    return <UserSettingsForm data={settings} />;
}
