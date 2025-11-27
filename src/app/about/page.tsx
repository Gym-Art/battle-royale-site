'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { Button } from '@/components/ui/Button';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';
import { useEffect } from 'react';

export default function AboutPage() {
  useEffect(() => {
    initSessionAttribution();
    trackEvent({ name: 'page_view', meta: { title: 'About' } });
  }, []);

  const team = [
    {
      name: 'Benjamin Astorga',
      role: 'CEO & Lead Developer',
      bio: 'Mexican National Team gymnast. BA Mathematics (Honours). Full-stack engineer who built the entire Gym Art platform used across Canada & US.',
    },
    {
      name: 'Julia Savenok',
      role: 'COO & Meet Director',
      bio: '5+ years directing gymnastics meets & clubs. 10 years competitive MAG coach. Operational lead for events with 600+ athletes.',
    },
    {
      name: 'Félix Blaquière',
      role: 'CFO & Backend Developer',
      bio: 'Finance background. Former Canadian National Team gymnast. Backend & infrastructure developer for Gym Art\'s scoring ecosystem.',
    },
    {
      name: 'Jamal Davis',
      role: 'Social Media Manager',
      bio: 'Scaled multiple brands to tens of thousands of followers. Expert in engagement strategy and performance-driven content.',
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-surface-black via-surface-dark to-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-magenta/10 rounded-full blur-[100px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <p className="text-neon-magenta uppercase tracking-[0.3em] text-sm mb-4 font-display">About Battle Royal</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-primary mb-6 tracking-wider">
              OUR <span className="text-neon-green text-glow-green">STORY</span>
            </h1>
            <p className="text-xl text-text-muted">
              Building the professional gymnastics league that should have existed decades ago.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-6 tracking-wider">
              THE <span className="text-neon-pink text-glow-pink">VISION</span>
            </h2>
            
            <div className="space-y-6 text-text-muted">
              <p>
                Gymnastics is one of the most-watched sports during the Olympics. Paris 2024 drew 
                <span className="text-neon-green"> 41.5 million viewers</span> for women&apos;s qualification alone—making it the most-watched 
                Olympic event. Yet outside of the Games, there&apos;s nothing.
              </p>
              <p>
                No professional league. No year-round competition. No team culture. No athlete 
                income pipeline. No way for the millions of gymnastics fans to engage with the 
                sport they love.
              </p>
              <p className="text-neon-green font-semibold text-xl text-glow-green">
                Battle Royal changes that.
              </p>
              <p>
                We&apos;re building a professional, repeatable competition league designed for spectators 
                first. <span className="text-neon-pink">Mixed teams. Normalized scoring. Real cash prizes.</span> A format that casual viewers 
                can follow and hardcore fans can obsess over.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-green/5 rounded-full blur-[100px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-6 tracking-wider">
              WHY <span className="text-neon-green text-glow-green">NOW</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Massive Demand', desc: '41.5M Olympic viewers prove the audience exists. Social media has created thousands of visible elite athletes with existing followings.', color: 'green' },
                { title: 'No Supply', desc: 'There\'s no professional league despite massive demand. Consumers are trained to watch niche sports (UFC, CrossFit, Ninja Warrior).', color: 'pink' },
                { title: 'We Have Distribution', desc: 'Gym Art Meets software reaches tens of thousands of gymnasts, parents, and coaches. We own the entire competition stack.', color: 'magenta' },
                { title: 'Proven Technology', desc: 'Our platform is stress-tested across International Gymnix and all major Canadian competitions. We can iterate faster than anyone.', color: 'green' },
              ].map((item, index) => (
                <div key={index} className="p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
                  <h3 className={`font-display text-xl mb-3 tracking-wide ${
                    item.color === 'green' ? 'text-neon-green' : 
                    item.color === 'pink' ? 'text-neon-pink' : 'text-neon-magenta'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gym Art */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl text-text-primary mb-6 tracking-wider">
              POWERED BY <span className="text-neon-magenta text-glow-magenta">GYM ART</span>
            </h2>
            
            <p className="text-text-muted mb-6">
              Battle Royal is produced by <strong className="text-text-primary">Gym Art Inc.</strong>, 
              the company behind Gym Art Meets—an end-to-end platform for gymnastics competition 
              management including registration, scheduling, scoring, and media.
            </p>
            
            <div className="p-6 bg-surface-card border border-surface-muted mb-6">
              <h3 className="font-display text-xl text-neon-green mb-3 tracking-wide">OUR UNFAIR ADVANTAGE</h3>
              <ul className="space-y-3 text-text-muted">
                <li>• <strong className="text-text-primary">Direct distribution</strong> to the gymnastics market through existing platform</li>
                <li>• <strong className="text-text-primary">Proprietary technology</strong> that we can modify without third-party dependencies</li>
                <li>• <strong className="text-text-primary">Deep industry network</strong> with federations, clubs, and elite athletes</li>
                <li>• <strong className="text-text-primary">Exclusive exposure</strong> at International Gymnix and major Canadian competitions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 text-center tracking-wider">
            THE <span className="text-neon-pink text-glow-pink">TEAM</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="p-6 bg-surface-card border border-surface-muted hover:border-neon-green transition-all duration-300">
                <h3 className="font-display text-xl text-text-primary mb-1 tracking-wide">{member.name}</h3>
                <p className="text-neon-green text-sm uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-text-muted text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl text-text-primary mb-4 tracking-wider">
              GET IN <span className="text-neon-green text-glow-green">TOUCH</span>
            </h2>
            <p className="text-text-muted mb-8">
              Questions about Battle Royal? Want to partner with us? We&apos;d love to hear from you.
            </p>

            <TrackedLink
              href={`mailto:${siteConfig.contactEmail}`}
              eventMeta={{ ctaId: 'about_contact', label: 'Contact Email' }}
            >
              <Button variant="primary" size="lg">
                {siteConfig.contactEmail}
              </Button>
            </TrackedLink>
          </div>
        </div>
      </section>

      <EmailSignupSection />
    </PageLayout>
  );
}
