import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAuthToken } from "@/lib/auth-token";
import LogoutButton from "@/components/LogoutButton";

const COOKIE_NAME = "auth_token";

export default async function AdminPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const session = await verifyAuthToken(token);

    if (!session) {
        redirect("/login?from=/admin");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
            <h1 className="text-3xl font-semibold">Espace administrateur</h1>
            <p className="text-neutral-300">
                Vous êtes connecté en tant qu&apos;administrateur.
            </p>
            <LogoutButton />
        </main>
    );
}
