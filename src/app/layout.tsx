import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarkar Packers and Movers Pvt. Ltd. | IBA Approved Relocation Services in Kolkata",
  description:
    "Sarkar Packers and Movers Pvt. Ltd. — IBA approved, trusted relocation experts in Kolkata. Safe household shifting, office relocation, car & bike transport across India. Get a free quote today.",
  keywords:
    "sarkar packers movers kolkata, IBA approved movers, household shifting, office relocation, car transport, bike transport, warehousing, India movers",
  openGraph: {
    title: "Sarkar Packers and Movers Pvt. Ltd. | IBA Approved Relocation Services",
    description:
      "Safe, Reliable and On Time Relocation Services Across India. 5000+ Happy Customers, 17+ Years Experience.",
    type: "website",
    locale: "en_IN",
    siteName: "Sarkar Packers and Movers Pvt. Ltd.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarkar Packers and Movers Pvt. Ltd. | IBA Approved",
    description: "Safe, Reliable and On Time Relocation Services Across India.",
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
