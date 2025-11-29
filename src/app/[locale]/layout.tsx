import { routing } from '@/i18n/routing';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  
  const siteName = t('siteName');
  const tagline = t('tagline');
  
  return {
    title: {
      default: `${siteName} | ${tagline}`,
      template: `%s | ${siteName}`,
    }, 
    description: 'The first professional gymnastics league. Mixed teams, normalized scoring, $25,000 prize pool. Battle Royale transforms gymnastics into a modern spectator sport.',
    keywords: ['gymnastics', 'competition', 'professional sports', 'Battle Royale', 'Gym Art', 'WAG', 'MAG'],
    authors: [{ name: 'Gym Art Inc.' }],
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      siteName,
      title: siteName,
      description: tagline,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: tagline,
    },
  };
}

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

  // Load only common messages (nav, common strings) - small and needed everywhere
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
