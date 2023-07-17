import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Providers from "app/providers";
import { AuthProvider } from "contexts/authProvider";
import "styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BoostForm",
  description: "Create Your Own Form",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <div id="modal-root" />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
