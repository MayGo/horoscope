import { auth } from '@clerk/nextjs/server';
import { clerkClient } from './clerkClient';

export const checkIsAdmin = async () => {
    const { userId } = await auth();
    if (!userId) {
        return false;
    }
    const user = await clerkClient.users.getUser(userId);
    return user.privateMetadata.isAdmin;
};
