import { type WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { deleteUserSettings } from '~/server/db/userSettings.queries';

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
    }
    const headerPayload = await headers();
    const svixId = headerPayload.get('svix-id');
    const svixTimestamp = headerPayload.get('svix-timestamp');
    const svixSignature = headerPayload.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
        return new Response('Error occurred -- no svix headers', { status: 400 });
    }

    const payload = await req.json();
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(JSON.stringify(payload), {
            'svix-id': svixId,
            'svix-timestamp': svixTimestamp,
            'svix-signature': svixSignature
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error verifying webhook', { status: 400 });
    }

    if (evt.type === 'user.deleted') {
        const userId = evt.data.id;

        if (!userId) {
            return new Response('User ID is missing', { status: 400 });
        }

        try {
            // Delete from database
            await deleteUserSettings(userId);

            // Delete from Redis cache happens naturally in 7 days

            console.log(`Successfully cleaned up data for deleted user: ${userId}`);
        } catch (error) {
            console.error('Error cleaning up user data:', error);
            return new Response('Error cleaning up user data', { status: 500 });
        }
    }

    return new Response('', { status: 200 });
}
