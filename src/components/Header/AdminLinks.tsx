'use server';

import Link from 'next/link';
import { checkIsAdmin } from '~/server/clerk/clerkQueries';
import { Button } from '../ui/button';

export default async function AdminLinks() {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return null;

    return (
        <>
            <Button asChild variant="ghost" color="black">
                <Link href="/search-general">Search General</Link>
            </Button>
            <Button asChild variant="ghost" color="black">
                <Link href="/search-mine">Search Mine</Link>
            </Button>
        </>
    );
}
