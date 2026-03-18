"use client";
import Image from "next/image";
import CircularText from "@/components/CircularText";
import { use } from "react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-6xl font-bold">
                Bienvenue sur mon portfolio !
            </h1>
            <p className="mt-4 text-xl">
                Découvrez mes projets et compétences.
            </p>
            <CircularText
                text="CERTIFIÉ WEBAC * DEV WEB * "
                onHover="speedUp"
                spinDuration={30}
                className="text-blue"
            />
        </main>
    );
}
