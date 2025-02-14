import { Heading, Separator, VStack } from '@chakra-ui/react';
import { UnauthorizedMessage } from '~/components/UnauthorizedMessage';
import { checkIsAdmin } from '~/server/clerk/clerkQueries';
import { EmailPreview } from './_components/EmailPreview';
import { SearchUserForm } from './_components/SearchUserForm';

export default async function TestEmailPage() {
    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
        return <UnauthorizedMessage />;
    }

    return (
        <VStack gap={6} p={6}>
            <Heading as="h1">Search My Horoscope</Heading>

            <SearchUserForm />
            <Separator mt={6} w="full" />
            <EmailPreview />
        </VStack>
    );
}
