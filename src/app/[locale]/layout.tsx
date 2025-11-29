import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Orbitron, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  }, 
  description: 'The first professional gymnastics league. Mixed teams, normalized scoring, $25,000 prize pool. Battle Royale transforms gymnastics into a modern spectator sport.',
  keywords: ['gymnastics', 'competition', 'professional sports', 'Battle Royale', 'Gym Art', 'WAG', 'MAG'],
  authors: [{ name: 'Gym Art Inc.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

