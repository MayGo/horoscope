import { getUserSettings } from '~/server/queries';
import { UserSettingsForm } from './UserSettingsForm';

export default async function UserSettings() {
    const settings = await getUserSettings();

    return <UserSettingsForm data={settings} />;
}
