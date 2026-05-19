"use client";
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/Scroll";
import { ThemeProvider } from "next-themes";

// Removed unused Metadata import
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <title>DriWE - Revolutionizing Urban Mobility</title>
        <meta name="description" content="Leading AI-powered transportation platform in Pune. Join the mobility revolution - explore investment opportunities with DriWE." />
      </head>
      <body
        className={`${poppins.variable} antialiased bg-black text-white min-h-screen`}
        suppressHydrationWarning
      >

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1px solid #facc15',
            },
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="bg-black text-white min-h-screen">
            <Header />
            <main className="flex-1 w-full bg-black text-white">
              {children}
            </main>
            <ScrollToTopButton />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

