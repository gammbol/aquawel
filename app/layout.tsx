import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ModalProvider} from "@/app/contexts/ModalContext";
import ApplicationModal from "@/app/components/ApplicationModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aquawel",
  description: "Мебель для ванных комнат",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
    <head>
      <link rel="icon" type="image/x-icon" href="/logo_light.svg"/>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        crossOrigin="anonymous"
      />
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ModalProvider>
        {children}
        <ApplicationModal />
      </ModalProvider>
    </body>
    </html>
  );
}
