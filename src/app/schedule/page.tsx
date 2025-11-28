'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { useEffect, useState } from 'react';

interface TimelineEvent {
  id: string;
  name: string;
  registrationDate: string;
  ticketsDate: string;
  competitionDate: string;
}

const events: TimelineEvent[] = [
  {
    id: 'br1',
    name: 'BR 1',
    registrationDate: 'Jul 1, 2026',
    ticketsDate: 'Sep 1, 2026',
    competitionDate: 'Nov 21, 2026',
  },
  {
    id: 'br2',
    name: 'BR 2',
    registrationDate: 'Aug 1, 2026',
    ticketsDate: 'Nov 1, 2026',
    competitionDate: 'Jan 23, 2027',
  },
  {
    id: 'br3',
    name: 'BR 3',
    registrationDate: 'Nov 1, 2026',
    ticketsDate: 'Jan 1, 2027',
    competitionDate: 'Apr 24, 2027',
  },
  {
    id: 'br4',
    name: 'BR 4',
    registrationDate: 'Jan 1, 2027',
    ticketsDate: 'Apr 1, 2027',
    competitionDate: 'Jun 12, 2027',
  },
];

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-surface-muted bg-surface-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-surface-muted/30 transition-colors duration-200"
      >
        <span className="font-display text-xl tracking-wider text-text-primary">{title}</span>
        <span className={`text-neon-green text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2">{children}</div>
      </div>
    </div>
  );
};

interface EventCardProps {
  event: TimelineEvent;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  return (
    <div className="relative">
      {/* Connecting line */}
      {index < events.length - 1 && (
        <div className="absolute left-8 top-full w-0.5 h-8 bg-gradient-to-b from-neon-green/50 to-transparent" />
      )}
      
      <div className="bg-surface-card border border-surface-muted hover:border-neon-green/50 transition-all duration-300 overflow-hidden group">
        {/* Header */}
        <div className="bg-gradient-to-r from-surface-muted to-surface-card px-6 py-4 flex items-center justify-between border-b border-surface-muted">
          <h3 className="font-display text-3xl tracking-wider text-neon-green">
            {event.name}
          </h3>
          <span className="font-display text-xl text-text-primary tracking-wide">
            {event.competitionDate}
          </span>
        </div>
        
        {/* Timeline rows */}
        <div className="p-6 space-y-4">
          {/* Registration */}
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-neon-green flex-shrink-0" />
            <div className="flex-grow flex items-center justify-between">
              <span className="text-text-muted">Registration Opens</span>
              <span className="text-neon-green font-semibold">{event.registrationDate}</span>
            </div>
          </div>
          
          {/* Tickets */}
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-neon-pink flex-shrink-0" />
            <div className="flex-grow flex items-center justify-between">
              <span className="text-text-muted">Spectator Tickets Open</span>
              <span className="text-neon-pink font-semibold">{event.ticketsDate}</span>
            </div>
          </div>
          
          {/* Competition */}
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-neon-yellow flex-shrink-0 animate-pulse" />
            <div className="flex-grow flex items-center justify-between">
              <span className="text-text-primary font-semibold">COMPETITION DAY</span>
              <span className="text-neon-yellow font-display text-lg">{event.competitionDate}</span>
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div className="px-6 pb-4">
          <p className="text-text-muted text-sm">
            📍 Ontario/Quebec, Canada
          </p>
        </div>
      </div>
    </div>
  );
};

export default function SchedulePage() {
  useEffect(() => {
    initSessionAttribution();
    trackEvent({ name: 'page_view', meta: { title: 'Schedule' } });
  }, []);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-surface-black via-surface-dark to-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-neon-green/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-neon-pink/10 rounded-full blur-[80px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <p className="text-neon-green uppercase tracking-[0.3em] text-sm mb-4 font-display">Season One</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-primary mb-6 tracking-wider">
              THE <span className="text-neon-pink">SCHEDULE</span>
            </h1>
            <p className="text-xl text-text-muted">
              4 events. <span className="text-neon-green">$100K in total prizes.</span> Your path to glory starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Proof of Concept */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block px-4 py-2 bg-surface-muted border border-neon-yellow/30 mb-4">
              <span className="text-neon-yellow font-display tracking-wider text-sm">COMING FIRST</span>
            </div>
            <h2 className="font-display text-3xl text-text-primary mb-4 tracking-wider">
              PROOF OF CONCEPT
            </h2>
            <p className="text-text-muted mb-2">
              <span className="text-neon-yellow font-semibold">June 21, 2026</span>
            </p>
            <p className="text-text-muted">
              The inaugural showcase event. Limited capacity. First look at what Battle Royale can be.
            </p>
          </div>
        </div>
      </section>

      {/* Event Cards */}
      <section className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 tracking-wider text-center">
            SEASON <span className="text-neon-green">EVENTS</span>
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-8">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Accordions */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="section-container relative z-10">
          <h2 className="font-display text-4xl text-text-primary mb-8 tracking-wider text-center">
            HOW IT <span className="text-neon-pink">WORKS</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Registration Accordion */}
            <Accordion title="HOW TO REGISTER" defaultOpen={true}>
              <div className="space-y-6">
                {/* Pricing */}
                <div>
                  <h4 className="text-neon-green font-display tracking-wide mb-3">PRICING</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-muted/30 border border-surface-muted">
                      <p className="text-text-muted text-sm">Per Gymnast</p>
                      <p className="font-display text-2xl text-neon-green">$250</p>
                    </div>
                    <div className="p-4 bg-surface-muted/30 border border-surface-muted">
                      <p className="text-text-muted text-sm">Per Coach</p>
                      <p className="font-display text-2xl text-neon-pink">$150</p>
                    </div>
                  </div>
                </div>
                
                {/* Key Info */}
                <div>
                  <h4 className="text-neon-green font-display tracking-wide mb-3">KEY INFO</h4>
                  <ul className="space-y-2 text-text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-neon-green">•</span>
                      <span><strong className="text-text-primary">64 team spots</strong> per event</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-green">•</span>
                      <span>Register on <strong className="text-neon-pink">Gym Art Meets</strong> platform</span>
                    </li>
                  </ul>
                </div>
                
                {/* Team Requirements */}
                <div>
                  <h4 className="text-neon-green font-display tracking-wide mb-3">TEAM REQUIREMENTS</h4>
                  <ul className="space-y-2 text-text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-neon-green">•</span>
                      <span><strong className="text-text-primary">Minimum 3 gymnasts</strong>, no maximum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-green">•</span>
                      <span>Mixed gender teams allowed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-green">•</span>
                      <span>Any club combination (no restrictions)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-green">•</span>
                      <span><strong className="text-text-primary">2 main team colors</strong> required</span>
                    </li>
                  </ul>
                </div>
                
                {/* Apparel */}
                <div>
                  <h4 className="text-neon-green font-display tracking-wide mb-3">APPAREL</h4>
                  <p className="text-text-muted">
                    <span className="text-neon-pink">No singlet requirement.</span> Matching colors, not baggy. 
                    Express your team&apos;s identity however you want.
                  </p>
                </div>
              </div>
            </Accordion>

            {/* Tickets Accordion */}
            <Accordion title="SPECTATOR TICKETS">
              <div className="space-y-6">
                {/* Ticket Types */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-surface-muted/30 border border-surface-muted text-center">
                    <p className="text-text-muted text-sm mb-2">General Admission</p>
                    <p className="font-display text-4xl text-neon-green mb-2">$30</p>
                    <p className="text-text-muted text-sm">Standard seating</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-neon-pink/10 to-neon-yellow/10 border border-neon-pink/30 text-center">
                    <p className="text-neon-pink text-sm mb-2 font-display tracking-wider">COURTSIDE</p>
                    <p className="font-display text-4xl text-neon-pink mb-2">$150</p>
                    <p className="text-text-muted text-sm">Front-row premium seating</p>
                  </div>
                </div>
                
                {/* Additional Info */}
                <div>
                  <ul className="space-y-2 text-text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-neon-pink">•</span>
                      <span>Tickets available prior to each event</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-pink">•</span>
                      <span>Event videos published on <strong className="text-text-primary">Gym Art app</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="section-padding bg-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-neon-yellow/5 rounded-full blur-[100px]" />
        
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-neon-yellow uppercase tracking-[0.3em] text-sm mb-4 font-display">Looking Ahead</p>
            <h2 className="font-display text-4xl text-text-primary mb-6 tracking-wider">
              THIS IS JUST THE <span className="text-neon-green">BEGINNING</span>
            </h2>
            <p className="text-text-muted text-lg mb-4">
              Year 1 is the foundation. Our goal is to scale Battle Royale to 
              <span className="text-neon-pink font-semibold"> $250,000 per competition</span>.
            </p>
            <p className="text-text-muted">
              More events. Bigger prizes. Global reach. Follow us to watch it grow.
            </p>
          </div>
        </div>
      </section>

      <EmailSignupSection />
    </PageLayout>
  );
}

