'use server';

import Link from 'next/link';
import { checkIsAdmin } from '~/server/clerk/clerkQueries';
import { Button } from '../ui/button';

export default async function AdminLinks() {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return null;

    return (
        <>
            <Link href="/search-general" passHref legacyBehavior>
                <Button variant="ghost" color="black">
                    Search General
                </Button>
            </Link>
            <Link href="/search-mine" passHref legacyBehavior>
                <Button variant="ghost" color="black">
                    Search Mine
                </Button>
            </Link>
        </>
    );
}
