import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PayrollOS | Enterprise Payroll & Workforce Management Platform",
  description:
    "Automate complex payroll calculations, validate multi-state workforce data, detect exceptions, reconcile ledgers, and scale compliant compensation management.",
  keywords: [
    "PayrollOS",
    "Payroll Automation",
    "Workforce Management",
    "Overtime Calculations",
    "Payroll Validation",
    "Payroll Reconciliation",
    "Exception Detection",
    "Role-Based Access Control",
    "Enterprise Payroll Platform",
  ],
  authors: [{ name: "PayrollOS Platform Inc." }],
  openGraph: {
    title: "PayrollOS | Enterprise Payroll & Workforce Management Platform",
    description:
      "Modern enterprise payroll infrastructure engineered for automated calculation, multi-rate wage blending, proactive validation, exception detection, and source-to-gross reconciliation.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen selection:bg-indigo-600 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
