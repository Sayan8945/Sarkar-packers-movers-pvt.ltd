import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OM Packers & Movers | IBA Approved Relocation Services in Kolkata",
  description:
    "OM Packers & Movers — IBA approved, trusted relocation experts in Kolkata. Safe household shifting, office relocation, car & bike transport across India. Get a free quote today.",
  keywords:
    "packers movers kolkata, IBA approved movers, household shifting, office relocation, car transport, bike transport, warehousing, India movers",
  openGraph: {
    title: "OM Packers & Movers | IBA Approved Relocation Services",
    description:
      "Safe, Secure and Trusted Relocation Services Across India. 5000+ Happy Customers, 17+ Years Experience.",
    type: "website",
    locale: "en_IN",
    siteName: "OM Packers & Movers",
  },
  twitter: {
    card: "summary_large_image",
    title: "OM Packers & Movers | IBA Approved",
    description: "Safe, Secure and Trusted Relocation Services Across India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
