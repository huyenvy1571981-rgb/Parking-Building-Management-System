import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parking Management System",
  description: "Parking Building Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="font-sans">{children}</body>
    </html>
  );
}
