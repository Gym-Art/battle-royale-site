import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';

export const FAQContactSection: React.FC = () => {
  return (
    <section className="section-padding bg-surface-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl text-text-primary mb-4 tracking-wider">
            STILL HAVE <span className="text-neon-green text-glow-green">QUESTIONS?</span>
          </h2>
          <p className="text-text-secondary mb-8">
            Can&apos;t find what you&apos;re looking for? Reach out directly and we&apos;ll get back to you.
          </p>

          <TrackedLink
            href={`mailto:${siteConfig.contactEmail}`}
            eventMeta={{ ctaId: 'faq_contact', label: 'Contact Email' }}
            className="inline-block px-8 py-4 bg-neon-green text-surface-black font-display tracking-wider hover:bg-neon-green/90 transition-colors duration-300"
          >
            {siteConfig.contactEmail}
          </TrackedLink>
        </div>
      </div>
    </section>
  );
};

