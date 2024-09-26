import type { Metadata } from "next";
import localFont from "next/font/local";
import { Audiowide, Roboto } from "@next/font/google";
import "./globals.css";

// Import local fonts
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// Import Audiowide and Roboto Google fonts
const audiowide = Audiowide({
    weight: "400", // Audiowide only has a 400 weight
    subsets: ["latin"],
});

const roboto = Roboto({
    weight: ["400", "700"], // Roboto has multiple weights, adjust as needed
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Sempre Studios",
    description: "fast and effective web services",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} antialiased`}
        >
        <header className={`${audiowide.className} text-4xl`}>
        </header>
        <main>
            {/* Main content will use Roboto font */}
            {children}
        </main>
        </body>
        </html>
    );
}
