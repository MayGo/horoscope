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

export const getUserEmail = async (userId: string) => {
    const user = await clerkClient.users.getUser(userId);
    if (user.emailAddresses.length === 0) {
        return null;
    }
    return user.emailAddresses[0]?.emailAddress;
};
