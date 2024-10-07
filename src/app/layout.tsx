import type { Metadata } from "next";
import localFont from "next/font/local";
import { Audiowide, Roboto_Condensed, Poppins } from "@next/font/google";
import "./globals.css";
import Script from 'next/script'

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

// Import Audiowide and Roboto Condensed Google fonts
const audiowide = Audiowide({
    weight: "400", // Audiowide only has a 400 weight
    subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
    weight: ["400", "700"], // Roboto Condensed has multiple weights
    subsets: ["latin"],
});

const poppins = Poppins({
    weight: ["400", "700"], // Roboto Condensed has multiple weights
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Sempre Studios",
    description: "fast and effective web services",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <head>
            {/* Google Analytics */}
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-HV0FF2HSP1"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-HV0FF2HSP1');
                `}
            </Script>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.className} antialiased`}
        >
        <header className={`${audiowide.className} text-4xl`}>
            {/* Your header content */}
        </header>
        <main>
            {/* Main content will use Roboto Condensed font */}
            {children}
        </main>
        </body>
        </html>
    );
}
