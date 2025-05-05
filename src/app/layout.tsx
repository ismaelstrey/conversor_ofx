import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Template from "@/components/template";
import JsonLd from "./jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conversor OFX - Gerador de Relatórios Financeiros | Extratos Bancários",
  description: "Ferramenta online gratuita para converter arquivos OFX em relatórios financeiros detalhados. Processe extratos bancários e gere análises de transações facilmente.",
  keywords: "conversor ofx, extrato bancário, relatório financeiro, processamento ofx, análise financeira, transações bancárias, arquivo ofx",
  openGraph: {
    title: "Conversor OFX - Transforme Extratos Bancários em Relatórios Detalhados",
    description: "Converta seus arquivos OFX em relatórios financeiros completos. Ferramenta gratuita para processamento de extratos bancários e análise de transações.",
    type: "website",
    locale: "pt_BR",
    siteName: "Conversor OFX"
  },
  robots: "index, follow",
  themeColor: "#0a0a0a",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://conversor-ofx.vercel.app"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Template>
          <main role="main" className="min-h-screen">
            {children}
          </main>
        </Template>
      </body>
    </html>
  );
}
