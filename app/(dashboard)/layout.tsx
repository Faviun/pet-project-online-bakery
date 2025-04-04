import type {Metadata} from "next";
import {Nunito} from "next/font/google";
import "../globals.css";
import {Header} from "@/shared/components/shared/header";

const nunito = Nunito({
    subsets: ["cyrillic"],
    variable: "--font-nunito",
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Домашняя выпечка",
    description: "Самая свежая выпечка в мире",
    //Придумать норм название
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={nunito.variable}>
                <main className="min-h-screen">
                    <Header />
                    {children}
                </main>
            </body>
        </html>
    );
}
