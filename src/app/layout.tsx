import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { MainLayout } from '@/components/layout/main-layout';
import { Toaster } from "@/components/ui/toaster";

// GeistSans and GeistMono are objects that directly provide .variable and .className
// No need to call them as functions like with next/font/google.

export const metadata: Metadata = {
  title: 'Guardian AI',
  description: 'Your Destiny 2 Companion App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Apply dark class to html tag for default dark theme if needed, or rely on :root vars */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <MainLayout>
          {children}
        </MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
