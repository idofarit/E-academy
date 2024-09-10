import { connectMongoDB } from "@/config/database-config";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayOutProvider from "./providers/layout-provider";
import ThemeProvider from "./providers/themeProvider";
import { App } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn-To-Infinite",
  description: "Keep learning with Us from anywhere, anytime",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectMongoDB();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-secondary`}>
          <App>
            <ThemeProvider>
              <LayOutProvider>{children}</LayOutProvider>
            </ThemeProvider>
          </App>
        </body>
      </html>
    </ClerkProvider>
  );
}
