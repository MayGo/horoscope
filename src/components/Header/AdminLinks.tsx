'use server';

import Link from 'next/link';
import { checkIsAdmin } from '~/server/clerk/clerkQueries';
import { Button } from '../ui/button';

export default async function AdminLinks() {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return null;

    return (
        <>
            <Link href="/test" passHref legacyBehavior>
                <Button variant="ghost" color="black">
                    Test
                </Button>
            </Link>
            <Link href="/email" passHref legacyBehavior>
                <Button variant="ghost" color="black">
                    Email Test
                </Button>
            </Link>
        </>
    );
}
