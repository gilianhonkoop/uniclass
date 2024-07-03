import "./globals.css";
import Providers from "./providers";
import localFont from "next/font/local";

const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
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
      path: "./fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
});

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  description: "Hoge kwaliteit tentamentraining voor een eerlijke prijs",
  openGraph: {
    title: "UniClass",
    description: "Hoge kwaliteit tentamentraining voor een eerlijke prijs",
    url: "https://uniclass.nl",
    siteName: "UniClass",
    images: [
      {
        url: "/logo.png",
        width: 1834,
        height: 475,
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
      <body className="w-full text-foreground h-screen absolute">
        <Providers>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
