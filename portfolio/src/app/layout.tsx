"use client";
import queryClient from "@/config/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster richColors />
            <Footer />
            <ReactQueryDevtools position="bottom" initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
