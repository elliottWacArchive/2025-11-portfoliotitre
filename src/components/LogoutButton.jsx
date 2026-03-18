"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch("/api/logout", { method: "POST" });
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
        </button>
    );
}
