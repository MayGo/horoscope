import { SignSelector } from './_components/SignSelector/SignSelector';

export default async function Home({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <SignSelector selectedSign={undefined} />
        </>
    );
}
