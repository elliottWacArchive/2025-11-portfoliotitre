import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
    title: "Portfolio",
    description: "Portfolio de Elliott!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr" className={cn("font-sans", geist.variable)}>
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
