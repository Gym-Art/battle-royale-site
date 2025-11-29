'use client';

import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';
import { useTranslations } from 'next-intl';
import React from 'react';

export const SocialLinks: React.FC = () => {
  const t = useTranslations('faq.socialLinks');
  
  return (
    <span>
      {t('followUs')}{' '}
      <TrackedLink
        href={siteConfig.socials[0].url}
        eventMeta={{ ctaId: 'faq_social_instagram', label: 'Instagram' }}
        className="text-neon-pink hover:underline"
      >
        Instagram
      </TrackedLink>
      ,{' '}
      <TrackedLink
        href={siteConfig.socials[1].url}
        eventMeta={{ ctaId: 'faq_social_tiktok', label: 'TikTok' }}
        className="text-neon-pink hover:underline"
      >
        TikTok
      </TrackedLink>
      , {t('or')}{' '}
      <TrackedLink
        href={siteConfig.socials[2].url}
        eventMeta={{ ctaId: 'faq_social_facebook', label: 'Facebook' }}
        className="text-neon-pink hover:underline"
      >
        Facebook
      </TrackedLink>
      , {t('or')}{' '}
      <TrackedLink
        href="#stay-connected"
        eventMeta={{ ctaId: 'faq_email_signup', label: 'Email Signup' }}
        className="text-neon-green hover:underline"
      >
        {t('joinEmailList')}
      </TrackedLink>
      .
    </span>
  );
};

