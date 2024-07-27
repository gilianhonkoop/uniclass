import "./globals.css";
import Providers from "./providers";
import localFont from "next/font/local";
import { NavigationEvents } from "../components/navigation/navigationEvents";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  preload: false,
});

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "http://localhost:3000";

export const metadata = {
  openGraph: {
    title: "UniClass",
    description: "Hoge kwaliteit tentamentraining voor een eerlijke prijs",
    url: "https://uniclass.nl",
    siteName: "UniClass",
    images: [
      // {
      //   url: "https://uniclass.nl/logo2.png",
      //   width: 362,
      //   height: 78,
      // },
      {
        url: "https://uniclass.nl/logo3.png",
        width: 716,
        height: 153,
      },
      {
        url: "https://uniclass.nl/logo.png",
        width: 1834,
        height: 475,
        alt: "alt larger resolution",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lg:snap-mandatory
    // lg:snap-y
    <html lang="en" className={`${poppins.className}`}>
      <head>
        <title>UniClass tentamentrainingen</title>
      </head>
      <body className="w-full text-foreground absolute h-full">
        {/* <Providers> */}
        <main className="min-h-screen flex flex-col items-center">
          {children}

          {/* <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense> */}
          {/* <SpeedInsights /> */}
        </main>
        {/* </Providers> */}
      </body>
    </html>
  );
}
