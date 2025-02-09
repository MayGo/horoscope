'use server';
import 'server-only';
import { userSettingsSchema } from '../validations/userSettings.validation';
type FormState = {
    success: boolean;
    fields?: Record<string, string | Date>;
    errors?: Record<string, string[]>;
};

export async function submitUserSettings(prevState: FormState, payload: FormData): Promise<FormState> {
    console.log('payload received', payload);

    if (!(payload instanceof FormData)) {
        return {
            success: false,
            errors: { error: ['Invalid Form Data'] }
        };
    }
    // Here, we use `Object.fromEntries(payload)` to convert the `FormData` object into a plain object. This allows us to work with the data in a format that the zod schema understands.

    const formData = Object.fromEntries(payload);
    console.log('form data', formData);

    const parsed = userSettingsSchema.safeParse(formData);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        const fields: Record<string, string> = {};

        for (const key of Object.keys(formData)) {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            fields[key] = formData[key]?.toString() ?? '';
        }
        console.log('error returned data', formData);
        console.log('error returned error', errors);
        return {
            success: false,
            fields,
            errors
        };
    }

    if (parsed.data.name?.includes('test')) {
        return {
            success: false,
            errors: { name: ['name cant include test'] },
            fields: parsed.data
        };
    }
    console.log('parsed data', parsed.data);
    return {
        success: true
    };
}
