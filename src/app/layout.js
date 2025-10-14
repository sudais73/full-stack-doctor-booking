'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppContextProvider from "@/context/AppContext";
import Footer from "@/components/Footer";
import toast, { Toaster } from 'react-hot-toast';
import { usePathname } from "next/navigation";
import AdminNav from "@/components/AdminNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

 // logic for navigation hiding
  const isAdmin = pathname.startsWith("/admin");
  const isDoc = pathname.startsWith("/doctor");
  const hideNav = isAdmin || isDoc;

  const isPublicPage = !isAdmin && !isDoc;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full px-[10%] mx-auto`}>
        <Toaster />

        <AppContextProvider>
        
          {!hideNav && (
            <Navbar />
          )}

          <div className={`${isPublicPage && 'pt-20 md:pt-24'}`}>
             {children}
          </div>

          {/* Show footer only on public pages */}
          {isPublicPage && <Footer />}
        </AppContextProvider>
      </body>
    </html>
  );
}