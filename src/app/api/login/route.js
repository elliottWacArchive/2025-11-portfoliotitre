import { NextResponse } from "next/server";
import { validateCredentials } from "@/lib/auth-credentials";
import { signAuthToken } from "@/lib/auth-token";

const COOKIE_NAME = "auth_token";
const MAX_AGE_SECONDS = 60 * 60 * 24;

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body ?? {};

        if (typeof username !== "string" || typeof password !== "string") {
            return NextResponse.json(
                { error: "Identifiants invalides" },
                { status: 400 },
            );
        }

        const isValid = validateCredentials(username, password);
        if (!isValid) {
            return NextResponse.json(
                { error: "Nom d'utilisateur ou mot de passe incorrect" },
                { status: 401 },
            );
        }

        const token = await signAuthToken({ username }, MAX_AGE_SECONDS);

        const response = NextResponse.json({ success: true });

        response.cookies.set({
            name: COOKIE_NAME,
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: MAX_AGE_SECONDS,
        });

        return response;
    } catch (error) {
        console.error("Login error", error);

        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
