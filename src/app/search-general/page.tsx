import { Box, Heading } from '@chakra-ui/react';
import { UnauthorizedMessage } from '~/components/UnauthorizedMessage';
import { checkIsAdmin } from '~/server/clerk/clerkQueries';
import { SearchGeneralForm } from './_components/SearchGeneralForm';

export const dynamic = 'force-dynamic';

export default async function TestPage() {
    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
        return <UnauthorizedMessage />;
    }

    return (
        <Box p={6}>
            <Heading as="h1" mb={4}>
                Testing Horoscope
            </Heading>
            <SearchGeneralForm />
        </Box>
    );
}
