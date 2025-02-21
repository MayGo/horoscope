'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SettingsSkeleton from '~/app/settings/loading';

export function ClientRedirectHandler({ path }: { path: string }) {
    const router = useRouter();

    useEffect(() => {
        router.replace(path);
    }, [router, path]);

    return <SettingsSkeleton />;
}
