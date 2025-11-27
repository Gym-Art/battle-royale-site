import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';

export const SocialLinks: React.FC = () => {
  return (
    <span>
      Follow us on{' '}
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
      , and{' '}
      <TrackedLink
        href={siteConfig.socials[2].url}
        eventMeta={{ ctaId: 'faq_social_facebook', label: 'Facebook' }}
        className="text-neon-pink hover:underline"
      >
        Facebook
      </TrackedLink>
      , or{' '}
      <TrackedLink
        href="#stay-connected"
        eventMeta={{ ctaId: 'faq_email_signup', label: 'Email Signup' }}
        className="text-neon-green hover:underline"
      >
        join our email list
      </TrackedLink>
      .
    </span>
  );
};

