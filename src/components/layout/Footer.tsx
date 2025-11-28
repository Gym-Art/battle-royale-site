'use client';

import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  tiktok: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-surface-dark border-t border-surface-muted">
      <div className="section-container py-12">
        {/* Neon Divider */}
        <div className="divider-neon mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logo.svg"
                alt="Battle Royale"
                width={32}
                height={32}
                className="drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
              />
              <h3 className="font-display text-xl text-neon-green tracking-widest">
                BATTLE ROYALE
              </h3>
            </div>
            <p className="text-text-muted text-sm">{siteConfig.tagline}</p>
          </div>

          {/* Learn More */}
          <div>
            <h4 className="font-display text-lg text-text-primary mb-3 tracking-wider">GYM ART</h4>
            <TrackedLink
              href="https://gymart.org"
              eventMeta={{ label: 'Learn More Gym Art', ctaId: 'footer_gymart_link' }}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-neon-green hover-glow-green transition-all duration-300 text-sm flex items-center gap-2"
            >
              Learn more about Gym Art
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </TrackedLink>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-text-primary mb-3 tracking-wider">CONTACT</h4>
            <TrackedLink
              href={`mailto:${siteConfig.contactEmail}`}
              eventMeta={{ label: 'Footer Email', ctaId: 'footer_email' }}
              className="text-text-muted hover:text-neon-green hover-glow-green transition-all duration-300 text-sm"
            >
              {siteConfig.contactEmail}
            </TrackedLink>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg text-text-primary mb-3 tracking-wider">FOLLOW US</h4>
            <div className="flex gap-4">
              {siteConfig.socials.map((social) => (
                <TrackedLink
                  key={social.platform}
                  href={social.url}
                  eventMeta={{ label: social.label, ctaId: `social_${social.platform}` }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-neon-pink transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,45,106,0.8)]"
                  aria-label={social.label}
                >
                  {socialIcons[social.platform]}
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surface-muted text-center">
          <p className="text-text-muted text-sm">
            © {currentYear} <span className="text-neon-green">Gym Art Inc.</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
