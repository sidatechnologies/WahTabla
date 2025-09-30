import {
    Hanken_Grotesk,
    Inter
} from 'next/font/google'
import localFont from "next/font/local";

export const geistSans = localFont({
    src: "./GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
export const geistMono = localFont({
    src: "./GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});


export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    adjustFontFallback: false,
});


export const hankenGrotesk = Hanken_Grotesk({
    subsets: ["latin"],
    variable: "--font-hankenGrotesk",
    display: "swap",
    adjustFontFallback: false,
});