import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Star Karlo Test",
    description: "Digital menu app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50`}>
                <main className="max-w-screen-md mx-auto my-0 bg-white p-2 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
