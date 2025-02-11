import { getMySettings } from '~/server/db/queries';
import { UserSettingsForm } from './UserSettingsForm';

export default async function UserSettings() {
    const settings = await getMySettings();

    return <UserSettingsForm data={settings} />;
}
