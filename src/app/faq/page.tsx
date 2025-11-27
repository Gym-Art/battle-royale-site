'use client';

import { trackEvent } from '@/analytics/analytics';
import { initSessionAttribution } from '@/analytics/session';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmailSignupSection } from '@/components/sections/EmailSignupSection';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';
import { useEffect, useState } from 'react';

// Battle Royale event dates
const BR_EVENTS = [
  { id: 'br1', name: 'Battle Royale 1', date: '2026-11-21', display: 'Nov 21, 2026' },
  { id: 'br2', name: 'Battle Royale 2', date: '2027-01-23', display: 'Jan 23, 2027' },
  { id: 'br3', name: 'Battle Royale 3', date: '2027-04-24', display: 'Apr 24, 2027' },
  { id: 'br4', name: 'Battle Royale 4', date: '2027-06-12', display: 'Jun 12, 2027' },
];

// Age Calculator Component
const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('br1');
  const [result, setResult] = useState<{ age: number; eligible: boolean } | null>(null);

  useEffect(() => {
    if (!birthDate) {
      setResult(null);
      return;
    }
    
    const birth = new Date(birthDate);
    const event = BR_EVENTS.find(e => e.id === selectedEvent);
    if (!event) return;

    const eventDate = new Date(event.date);
    let age = eventDate.getFullYear() - birth.getFullYear();
    const monthDiff = eventDate.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && eventDate.getDate() < birth.getDate())) {
      age--;
    }

    setResult({ age, eligible: age >= 16 });
  }, [birthDate, selectedEvent]);

  return (
    <div className="mt-4 p-4 bg-surface-muted/30 border border-surface-muted rounded">
      <p className="text-neon-pink font-display text-sm tracking-wider mb-3">AGE CALCULATOR</p>
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <div className="flex-1">
          <label className="block text-text-secondary text-sm mb-1">Your birthdate</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 bg-surface-dark border border-surface-muted text-text-primary rounded focus:border-neon-green focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <label className="block text-text-secondary text-sm mb-1">Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full px-3 py-2 bg-surface-dark border border-surface-muted text-text-primary rounded focus:border-neon-green focus:outline-none"
          >
            {BR_EVENTS.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name} ({event.display})
              </option>
            ))}
          </select>
        </div>
      </div>
      {result && (
        <div className={`p-3 rounded ${result.eligible ? 'bg-neon-green/10 border border-neon-green/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className="text-text-primary">
            You will be <span className={`font-bold ${result.eligible ? 'text-neon-green' : 'text-red-400'}`}>{result.age} years old</span> on event day.
          </p>
          <p className={`text-sm mt-1 ${result.eligible ? 'text-neon-green' : 'text-red-400'}`}>
            {result.eligible ? '✓ You meet the age requirement!' : '✗ You must be at least 16 years old on event day.'}
          </p>
        </div>
      )}
    </div>
  );
};

// Score Normalization Formula Component
const ScoreFormula: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-surface-muted/30 border border-surface-muted rounded">
      <p className="text-neon-green font-display text-sm tracking-wider mb-3">THE FORMULA</p>
      <div className="bg-surface-dark p-4 rounded border border-surface-muted text-center mb-4">
        <p className="text-text-primary font-mono text-lg">
          <span className="text-neon-pink">Normalized Score</span> = (<span className="text-neon-green">FIG Score</span> ÷ <span className="text-neon-magenta">Max Start Value</span>) × 10
        </p>
      </div>
      <p className="text-neon-pink font-display text-sm tracking-wider mb-2">EXAMPLE</p>
      <div className="bg-surface-dark p-4 rounded border border-surface-muted">
        <p className="text-text-secondary mb-2">
          A gymnast scores <span className="text-neon-green font-semibold">14.2</span> on Men&apos;s Vault (piked Dragulescu):
        </p>
        <p className="text-text-primary font-mono text-center my-3">
          14.2 ÷ 15.6 × 10 = <span className="text-neon-green font-bold">9.10256</span>
        </p>
        <p className="text-text-secondary text-sm">
          Note: In men&apos;s gymnastics, the highest possible start value on Vault is 15.6 (ex. a piked Dragulescu).
        </p>
      </div>
    </div>
  );
};

// Social Media Links Component
const SocialLinks: React.FC = () => {
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

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQCategory {
  id: string;
  name: string;
  color: 'green' | 'pink' | 'magenta';
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    id: 'general',
    name: 'General',
    color: 'green',
    items: [
      {
        question: 'What is Battle Royale?',
        answer: 'Battle Royale is the first professional gymnastics league, designed for spectators first. It features mixed-gender teams, normalized scoring out of 10, real cash prizes (in CAD), and a single-day elimination format that makes gymnastics easy to follow and exciting to watch.',
      },
      {
        question: 'Who organizes Battle Royale?',
        answer: 'Battle Royale is produced by Gym Art Inc., the company behind Gym Art Meets—an end-to-end platform for gymnastics competition management used at International Gymnix and all major Canadian competitions.',
      },
      {
        question: 'When and where are events held?',
        answer: 'Season 1 runs from November 2026 to June 2027 with 4 events held in Ontario and Quebec, Canada. The first event (BR 1) is November 21, 2026. A proof of concept event is scheduled for June 21, 2026.',
      },
      {
        question: 'How is Battle Royale different from traditional gymnastics competitions?',
        answer: 'Traditional competitions span multiple days, separate men and women, use confusing scoring systems, and rely on gymnast registration for revenue. Battle Royale is a single-day spectacle with mixed teams, normalized scores out of 10, cash prizes, and a format designed for entertainment.',
      },
      {
        question: 'What is the prize pool?',
        answer: '$25,000 CAD per event, split as: 1st place $15,000 CAD, 2nd place $7,500 CAD, 3rd place $2,500 CAD. Teams finishing 4th–8th receive exclusive Battle Royale merchandise. Year 1 total: $100,000 CAD in prizes across 4 events.',
      },
      {
        question: 'Is this affiliated with any gymnastics federation?',
        answer: 'Battle Royale is an independent invitational competition. While we use FIG (International Gymnastics Federation) judging standards and Code of Points, we are not a federation-sanctioned qualification event. This gives us the freedom to innovate on format and scoring.',
      },
    ],
  },
  {
    id: 'gymnasts',
    name: 'For Gymnasts',
    color: 'pink',
    items: [
      {
        question: 'Who can compete?',
        answer: (
          <span>
            Any gymnast aged 16+ on the day of the event who can perform FIG-level routines. No federation membership required. No qualification requirements. Open invitational format. <SocialLinks />
          </span>
        ),
      },
      {
        question: 'What are the age requirements?',
        answer: (
          <div>
            <p>Athletes must be at least 16 years old on the day of the event. There is no upper age limit.</p>
            <AgeCalculator />
          </div>
        ),
      },
      {
        question: 'What skill level is required?',
        answer: (
          <div>
            <p className="mb-3">
              Athletes should be capable of performing FIG Senior-level routines. This typically means competitive Level 10, Elite, or NCAA-level gymnasts for WAG, and Level 10 or Elite for MAG.
            </p>
            <p className="mb-3">
              A FIG routine consists of 6-8 elements from the FIG Code of Points.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <TrackedLink
                href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1%20-%20MAG%20CoP%202025-2028.pdf"
                eventMeta={{ ctaId: 'faq_mag_cop', label: 'MAG Code of Points' }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
              >
                <span>📄</span> MAG Code of Points (2025-2028)
              </TrackedLink>
              <TrackedLink
                href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1.%20WAG%20Code%20of%20Points%202025-2028.pdf"
                eventMeta={{ ctaId: 'faq_wag_cop', label: 'WAG Code of Points' }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 text-neon-pink hover:bg-neon-pink/20 transition-colors"
              >
                <span>📄</span> WAG Code of Points (2025-2028)
              </TrackedLink>
            </div>
          </div>
        ),
      },
      {
        question: 'How do I register?',
        answer: (
          <span>
            Registration opens on the Gym Art Meets platform 4 months before each event. Teams register together, listing all gymnasts and coaches. <SocialLinks />
          </span>
        ),
      },
      {
        question: 'How much does registration cost?',
        answer: '$250 CAD per gymnast, $150 CAD per coach. Early bird discounts and dynamic pricing may apply based on demand.',
      },
      {
        question: 'How do teams work?',
        answer: (
          <div>
            <p className="mb-3">
              Teams need a minimum of 3 gymnasts with no maximum size. Teams can be all women, all men, or any mix. Gymnasts from different clubs can form teams together—there are no club or federation restrictions.
            </p>
            <div className="p-3 bg-neon-magenta/10 border border-neon-magenta/30 rounded mt-3">
              <p className="text-neon-magenta font-display text-sm tracking-wider mb-1">NATIONAL TEAM LIMIT</p>
              <p className="text-text-secondary">
                To prevent &quot;super teams&quot; in the early seasons, each team may only include <span className="text-text-primary font-semibold">one current national team member</span>. This ensures competitive balance and gives all teams a fair chance.
              </p>
            </div>
          </div>
        ),
      },
      {
        question: 'What apparatuses are used?',
        answer: (
          <div>
            <p className="mb-3">
              <span className="text-neon-pink font-semibold">WAG (4 events):</span> Vault, Uneven Bars, Balance Beam, Floor Exercise
            </p>
            <p className="mb-3">
              <span className="text-neon-green font-semibold">MAG (4 events):</span> Vault, Floor Exercise, Still Rings, High Bar
            </p>
            <p className="mb-3">Mixed teams can use any combination of these 8 apparatus.</p>
            <div className="p-3 bg-surface-muted/30 border border-surface-muted rounded mt-3">
              <p className="text-neon-magenta font-display text-sm tracking-wider mb-1">WHY NO POMMEL HORSE OR PARALLEL BARS?</p>
              <p className="text-text-secondary">
                We&apos;ve streamlined the men&apos;s apparatus to 4 events to match women&apos;s gymnastics. <span className="text-text-primary">Pommel Horse</span> was removed because it&apos;s often the trickiest event for gymnasts and prone to falls. <span className="text-text-primary">Parallel Bars</span> was removed because routines take the longest—and we&apos;re focused on an action-packed spectator experience.
              </p>
              <p className="text-text-secondary mt-2">
                We kept <span className="text-neon-green">Still Rings</span> (iconic strength event), <span className="text-neon-green">High Bar</span> (spectacular releases and dismounts), plus Vault and Floor (shared with women&apos;s).
              </p>
            </div>
          </div>
        ),
      },
      {
        question: 'What are the apparel requirements?',
        answer: 'No singlet requirement. Teams must have 2 main team colors and wear matching, non-baggy attire. Express your team\'s identity however you want—this is about entertainment and team spirit.',
      },
      {
        question: 'Do I need to be part of a club or federation?',
        answer: 'No. Battle Royale is open to all eligible gymnasts regardless of club affiliation or federation membership. You can compete as an independent athlete on any team.',
      },
      {
        question: 'Can I compete on multiple teams?',
        answer: 'No. Each gymnast may only compete on one team per event.',
      },
      {
        question: 'What routines should I prepare?',
        answer: 'Prepare your existing FIG-level routines. No changes needed. You\'ll be judged using standard FIG Code of Points, then scores are normalized for fair comparison.',
      },
      {
        question: 'How does score normalization work?',
        answer: (
          <div>
            <p className="mb-3">
              Your standard FIG score is scaled based on the highest possible start value for that apparatus, resulting in a final score out of 10. This makes scores instantly understandable and allows fair comparison across all apparatus (beam vs high bar, WAG vs MAG).
            </p>
            <ScoreFormula />
          </div>
        ),
      },
      {
        question: 'How is the competition structured?',
        answer: (
          <div>
            <p className="mb-3">
              Single-day elimination format: <span className="text-neon-green font-semibold">Qualification</span> (9:00 AM - 3:00 PM, 64 teams, 8 routines each) → <span className="text-neon-pink font-semibold">Semi-Finals</span> (6:00 PM - 7:30 PM, top 12 teams, 6 routines each) → <span className="text-neon-magenta font-semibold">Finals</span> (8:00 PM - 8:30 PM, top 4 teams, 4 routines each). Highest total score wins.
            </p>
            <p className="mb-3 text-text-secondary">
              Qualification consists of four 80-minute rounds. All routine scores count toward your team total. Each team may only perform 2 routines per apparatus.
            </p>
            <div className="p-3 bg-neon-green/10 border border-neon-green/30 rounded">
              <p className="text-neon-green font-display text-sm tracking-wider mb-1">APPOINTMENT-BASED SCHEDULING</p>
              <p className="text-text-secondary">
                Unlike traditional rotation-based competitions, Battle Royale uses appointment-based scheduling. Each athlete receives a specific time slot for their routine (e.g., &quot;Athlete A: Uneven Bars at 9:05 AM&quot;). Multiple athletes may compete simultaneously on different apparatus. Detailed schedules are released close to the event.
              </p>
            </div>
          </div>
        ),
      },
      {
        question: 'How many routines does my team perform?',
        answer: 'Qualification: 8 routines (max 2 per apparatus). Semi-Finals: 6 routines (max 2 per apparatus, 1 vault). Finals: 4 routines (max 2 per apparatus).',
      },
      {
        question: 'What happens if I fall during a routine?',
        answer: 'Falls are deducted per standard FIG rules. In semi-finals and finals, each athlete has 120 seconds to complete their routine—no extra time is given for falls. Skills performed after the time limit don\'t count.',
      },
      {
        question: 'What is the time limit per routine?',
        answer: (
          <div>
            <p className="mb-3">
              Standard FIG time limits apply during qualification. In semi-finals and finals, there&apos;s a 120-second hard limit per routine with no extensions.
            </p>
            <p className="text-text-secondary">
              Remember: Battle Royale uses appointment-based scheduling, not rotations. You&apos;ll know exactly when you compete—check the{' '}
              <TrackedLink href="/schedule" eventMeta={{ ctaId: 'faq_schedule_link', label: 'Schedule Link' }} className="text-neon-green hover:underline">
                schedule page
              </TrackedLink>{' '}
              for event dates.
            </p>
          </div>
        ),
      },
      {
        question: 'How are prizes distributed?',
        answer: 'Prize money goes to the team. How teams divide winnings internally is up to them. 1st: $15,000 CAD, 2nd: $7,500 CAD, 3rd: $2,500 CAD. Teams 4th–8th receive merchandise prizes.',
      },
    ],
  },
  {
    id: 'coaches',
    name: 'For Coaches',
    color: 'magenta',
    items: [
      {
        question: 'How do I register my athletes?',
        answer: (
          <div>
            <p className="mb-3">Register your team through the Gym Art Meets platform when registration opens. You&apos;ll need:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 text-text-secondary">
              <li><span className="text-text-primary">Full name</span> for each athlete</li>
              <li><span className="text-text-primary">Team name</span> and <span className="text-text-primary">team colors/brand</span></li>
              <li><span className="text-text-primary">Registration fees</span> ($250 CAD per gymnast, $150 CAD per coach)</li>
              <li>Payment via <span className="text-text-primary">credit card</span> or <span className="text-text-primary">bank transfer</span></li>
            </ul>
            <p className="mb-3 text-text-secondary">
              <span className="text-neon-magenta font-semibold">Registration opens:</span> BR 1 (July 2026), BR 2 (August 2026), BR 3 (November 2026), BR 4 (January 2027)
            </p>
            <TrackedLink
              href="/schedule"
              eventMeta={{ ctaId: 'faq_coach_schedule', label: 'View Schedule' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
            >
              View Full Schedule →
            </TrackedLink>
          </div>
        ),
      },
      {
        question: 'What is the coach registration fee?',
        answer: '$150 CAD per coach. Each team should have at least one registered coach for floor access and athlete support.',
      },
      {
        question: 'Can I coach multiple teams?',
        answer: 'Yes, coaches may be registered with multiple teams at the same event, though scheduling conflicts during competition are your responsibility to manage.',
      },
      {
        question: 'What is my role during competition?',
        answer: 'Coaches have floor access to support their athletes, similar to traditional competitions. You\'ll help with warm-ups, provide spotting where allowed, and support athletes between routines.',
      },
      {
        question: 'Do I need specific certifications?',
        answer: 'While specific certification requirements are being finalized, we recommend coaches have standard gymnastics coaching credentials (NCCP, USAG, or equivalent). Safety certifications may be required for spotting.',
      },
      {
        question: 'How do warm-ups work?',
        answer: 'Teams will have scheduled warm-up times before their competition rounds. Detailed warm-up schedules will be provided closer to each event. The single-day format means efficient warm-up rotations.',
      },
    ],
  },
  {
    id: 'judges',
    name: 'For Judges',
    color: 'green',
    items: [
      {
        question: 'How is judging structured?',
        answer: (
          <div>
            <p className="mb-3">
              In the qualification round, we use <span className="text-neon-green font-semibold">two panels per event</span>, with each panel consisting of <span className="text-neon-green font-semibold">one judge</span> who evaluates both Difficulty and Execution for maximum speed.
            </p>
            <p className="mb-3 text-text-secondary">
              The system works like this: One gymnast competes, and the moment they finish, the first panel starts judging them. While the first panel is judging, the next gymnast competes while the second panel judges them. When they finish, the panels swap. This means there&apos;s always someone competing at all times—we must respect strict time restraints.
            </p>
            <p className="text-text-secondary">
              We only select the best of the best judges: those who are fast, accurate, and unbiased. This streamlined approach ensures constant action while maintaining the highest judging standards.
            </p>
          </div>
        ),
      },
      {
        question: 'What code of points is used?',
        answer: (
          <div>
            <p className="mb-3">FIG Code of Points (current cycle). Judges use the same deductions, difficulty values, and execution standards they&apos;re already trained on.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <TrackedLink
                href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1%20-%20MAG%20CoP%202025-2028.pdf"
                eventMeta={{ ctaId: 'faq_judge_mag_cop', label: 'MAG Code of Points' }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
              >
                <span>📄</span> MAG CoP 2025-2028
              </TrackedLink>
              <TrackedLink
                href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1.%20WAG%20Code%20of%20Points%202025-2028.pdf"
                eventMeta={{ ctaId: 'faq_judge_wag_cop', label: 'WAG Code of Points' }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 text-neon-pink hover:bg-neon-pink/20 transition-colors"
              >
                <span>📄</span> WAG CoP 2025-2028
              </TrackedLink>
            </div>
          </div>
        ),
      },
      {
        question: 'How does score normalization affect judging?',
        answer: (
          <div>
            <p className="mb-3">It doesn&apos;t affect your judging at all. You judge routines normally using FIG standards. The normalization calculation happens after you submit your scores—it&apos;s a mathematical transformation applied to make scores comparable across apparatus.</p>
            <ScoreFormula />
          </div>
        ),
      },
      {
        question: 'How do judges submit scores?',
        answer: (
          <div>
            <p className="mb-3">
              Judges submit scores using the <span className="text-neon-green font-semibold">Judges Companion app</span>, a helper app built into Gym Art Meets. This is our in-house application designed for maximum speed and super easy use.
            </p>
            <p className="text-text-secondary">
              You simply input an FIG score, and the score normalization happens automatically in the background. On the scoreboard, spectators see the normalized score out of 10—all done seamlessly without changing your judging process.
            </p>
          </div>
        ),
      },
      {
        question: 'Are judges assigned to specific apparatus?',
        answer: 'Yes, judges are assigned to specific apparatus based on their certifications and expertise, similar to traditional FIG competitions.',
      },
      {
        question: 'How can I get involved as a judge?',
        answer: (
          <span>
            We&apos;re actively recruiting certified FIG judges (brevet or national level). Contact us at{' '}
            <TrackedLink
              href={`mailto:${siteConfig.contactEmail}?subject=Judge%20Inquiry`}
              eventMeta={{ ctaId: 'faq_judge_email', label: 'Judge Email' }}
              className="text-neon-green hover:underline"
            >
              {siteConfig.contactEmail}
            </TrackedLink>{' '}
            with your credentials and availability.
          </span>
        ),
      },
    ],
  },
  {
    id: 'spectators',
    name: 'For Spectators',
    color: 'pink',
    items: [
      {
        question: 'How do I buy tickets?',
        answer: (
          <span>
            Tickets go on sale 2 months before each event through our website and the Gym Art platform. <SocialLinks />
          </span>
        ),
      },
      {
        question: 'How much are tickets?',
        answer: 'General admission: $30 CAD. Courtside/VIP seating: $150 CAD. Prices may vary for special events.',
      },
      {
        question: 'What are VIP/courtside tickets?',
        answer: (
          <div>
            <p className="mb-3">
              VIP/courtside tickets ($150 CAD) offer something that&apos;s never been done before in gymnastics. VIPs sit from the <span className="text-neon-pink font-semibold">same viewpoint as judges</span>—literally <span className="text-neon-pink font-semibold">2-3 meters away from the apparatus</span>.
            </p>
            <p className="mb-3 text-text-secondary">
              You&apos;ll experience the sport alongside the gymnasts in real time, feeling every landing, hearing every breath, seeing every detail up close. It&apos;s an immersive experience that will blow your mind.
            </p>
            <p className="text-text-secondary">
              Perfect for serious gymnastics fans, photographers, and anyone wanting the most intimate view of elite competition.
            </p>
          </div>
        ),
      },
      {
        question: 'How long is the event?',
        answer: 'The full day runs from 9:00 AM to approximately 8:30 PM. Morning qualifications (9 AM – 3 PM) and evening finals (6 PM – 8:30 PM) can be attended separately or together.',
      },
      {
        question: 'What is the event schedule?',
        answer: 'Morning (9 AM – 3 PM): Four qualification rounds with 64 teams. Evening (6 PM – 8:30 PM): Semi-finals (12 teams) and Finals (4 teams). The evening session is the main spectacle with higher stakes.',
      },
      {
        question: 'Can I watch online?',
        answer: 'Yes. Event videos will be published on the Gym Art app. Live streaming options are being developed. Online viewing may have a small fee ($8 CAD).',
      },
      {
        question: 'Is food and drink available?',
        answer: 'Venue-dependent. Most venues will have concessions available. Details will be provided for each specific event location.',
      },
      {
        question: 'Are events family-friendly?',
        answer: 'Absolutely. Battle Royale is designed for all ages. The team format and clear scoring make it perfect for introducing kids to competitive gymnastics in an exciting environment.',
      },
    ],
  },
  {
    id: 'sponsors',
    name: 'For Sponsors',
    color: 'magenta',
    items: [
      {
        question: 'What sponsorship opportunities exist?',
        answer: 'Three main tiers: Cash Prize Partners (support athlete rewards), Merch & Apparel Partners (outfit the competition), and Equipment & Services Partners (provide equipment, technology, or services).',
      },
      {
        question: 'What do sponsors receive?',
        answer: 'Event-day visibility (logo placement, announcements, branded areas), digital presence (website, social media, live stream integration), direct access to the gymnastics community through Gym Art platform, hospitality (VIP access, athlete meet-and-greets), and category exclusivity options.',
      },
      {
        question: 'How do I become a sponsor?',
        answer: (
          <span>
            Contact us at{' '}
            <TrackedLink
              href={`mailto:${siteConfig.contactEmail}?subject=Sponsorship%20Inquiry`}
              eventMeta={{ ctaId: 'faq_sponsor_email', label: 'Sponsor Email' }}
              className="text-neon-green hover:underline"
            >
              {siteConfig.contactEmail}
            </TrackedLink>{' '}
            to discuss partnership opportunities. We&apos;ll work with you to create a package that meets your goals.
          </span>
        ),
      },
      {
        question: 'What is the reach/audience?',
        answer: 'Gymnastics reached 41.5 million viewers at Paris 2024 (most-watched Olympic sport). Our regional market includes 23,000+ competitive gymnasts and 250,000+ reachable audience members (parents, recreational athletes, coaches) in Ontario, Quebec, and NY/NJ.',
      },
    ],
  },
  {
    id: 'format',
    name: 'Competition Format',
    color: 'green',
    items: [
      {
        question: 'How does the elimination format work?',
        answer: (
          <div>
            <div className="mb-4">
              <p className="text-neon-green font-display text-sm tracking-wider mb-2">QUALIFICATION (9:00 AM → 3:00 PM)</p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                <li>There are <span className="text-text-primary font-semibold">four qualification rounds</span> in the morning, each lasting <span className="text-text-primary font-semibold">80 minutes</span></li>
                <li>Each team must perform <span className="text-text-primary font-semibold">8 routines</span></li>
                <li><span className="text-text-primary font-semibold">All scores count</span> towards the team score</li>
                <li>Each team may only perform <span className="text-text-primary font-semibold">2 routines per apparatus</span></li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-neon-pink font-display text-sm tracking-wider mb-2">SEMI-FINALS (6:00 PM → 7:30 PM)</p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                <li>The <span className="text-text-primary font-semibold">top 12 teams</span> from Qualification advance to the semi-final</li>
                <li>Each team competes <span className="text-text-primary font-semibold">6 routines</span>, all of which count</li>
                <li>Each team may only perform <span className="text-text-primary font-semibold">2 routines per apparatus and one vault</span></li>
                <li>Each athlete has <span className="text-text-primary font-semibold">120 seconds</span> to complete their routine (no extra time with falls), after which no skills are counted</li>
              </ul>
            </div>
            <div>
              <p className="text-neon-magenta font-display text-sm tracking-wider mb-2">FINALS (8:00 PM → 8:30 PM)</p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                <li>The <span className="text-text-primary font-semibold">final 4 teams</span> gather in the middle of the arena</li>
                <li>Each team must perform <span className="text-text-primary font-semibold">4 routines</span>, all of which count</li>
                <li><span className="text-text-primary font-semibold">One athlete competes at a time</span>, starting with Team 1, then Team 2, etc.</li>
                <li>Each team may only perform <span className="text-text-primary font-semibold">2 routines per apparatus</span></li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        question: 'What is score normalization?',
        answer: (
          <div>
            <p className="mb-3">A mathematical transformation that scales FIG scores based on the highest possible start value for each apparatus, resulting in scores out of 10. This allows direct comparison across all apparatus and between WAG and MAG routines.</p>
            <ScoreFormula />
          </div>
        ),
      },
      {
        question: 'How are teams ranked?',
        answer: 'Teams are ranked by total team score within each round. All routine scores count—there are no drop scores. The team with the highest total at the end of each round advances.',
      },
      {
        question: 'Can WAG and MAG compete together?',
        answer: 'Yes! This is one of Battle Royale\'s innovations. Score normalization makes it fair for women and men to compete on the same team, comparing beam to high bar, women\'s floor to men\'s floor, etc.',
      },
      {
        question: 'How are ties broken?',
        answer: (
          <div>
            <p className="mb-3">
              We follow <span className="text-neon-green font-semibold">FIG regulations</span> for breaking ties:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-text-secondary ml-2 mb-4">
              <li>First, compare <span className="text-text-primary font-semibold">execution scores</span></li>
              <li>Then, compare <span className="text-text-primary font-semibold">difficulty scores</span></li>
            </ol>
            <div className="p-3 bg-neon-magenta/10 border border-neon-magenta/30 rounded">
              <p className="text-neon-magenta font-display text-sm tracking-wider mb-1">DEATH MATCH</p>
              <p className="text-text-secondary">
                If it&apos;s still a true tie, we go to a <span className="text-text-primary font-semibold">death match</span>: both teams send up <span className="text-text-primary font-semibold">one athlete</span> (or two) to perform routines. The sum of those routines determines the final winner.
              </p>
            </div>
          </div>
        ),
      },
      {
        question: 'What is appointment-based scheduling?',
        answer: (
          <div>
            <p className="mb-3">
              Unlike traditional competitions where teams rotate through apparatus together, Battle Royale uses <span className="text-neon-green font-semibold">appointment-based scheduling</span>.
            </p>
            <p className="mb-3 text-text-secondary">
              Each athlete receives a specific time for their routine. For example: &quot;Athlete A - Uneven Bars at 9:05 AM, Athlete B - Vault at 9:10 AM.&quot; Multiple athletes can compete simultaneously on different apparatus.
            </p>
            <p className="text-text-secondary">
              This creates a more dynamic, action-packed viewing experience with constant activity across the competition floor.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: 'logistics',
    name: 'Logistics & Schedule',
    color: 'pink',
    items: [
      {
        question: 'Where are Season 1 events located?',
        answer: 'All Season 1 events are in Ontario and Quebec, Canada. Specific venues will be announced as they\'re confirmed. We\'re targeting venues with good spectator capacity and professional gymnastics equipment.',
      },
      {
        question: 'What is the proof of concept event?',
        answer: 'A limited-capacity showcase event on June 21, 2026, before the official Season 1 launch. This is our inaugural event to demonstrate the format and build excitement. Details TBD.',
      },
      {
        question: 'When does registration open?',
        answer: (
          <span>
            Registration opens 4 months before each event: BR 1 (July 2026), BR 2 (August 2026), BR 3 (November 2026), BR 4 (January 2027). <SocialLinks />
          </span>
        ),
      },
      {
        question: 'When do tickets go on sale?',
        answer: (
          <span>
            Spectator tickets go on sale 2 months before each event: BR 1 (September 2026), BR 2 (November 2026), BR 3 (January 2027), BR 4 (April 2027). <SocialLinks />
          </span>
        ),
      },
      {
        question: 'What if an event is cancelled?',
        answer: 'In the unlikely event of cancellation, full refunds will be provided for registration and ticket purchases. We have backup venue plans and flexible scheduling (unlike federation events locked to specific dates).',
      },
      {
        question: 'How do I stay updated?',
        answer: (
          <span>
            Sign up for our email list on this website, follow us on{' '}
            <TrackedLink
              href={siteConfig.socials[0].url}
              eventMeta={{ ctaId: 'faq_instagram', label: 'Instagram' }}
              className="text-neon-pink hover:underline"
            >
              Instagram
            </TrackedLink>
            ,{' '}
            <TrackedLink
              href={siteConfig.socials[1].url}
              eventMeta={{ ctaId: 'faq_tiktok', label: 'TikTok' }}
              className="text-neon-pink hover:underline"
            >
              TikTok
            </TrackedLink>
            , and{' '}
            <TrackedLink
              href={siteConfig.socials[2].url}
              eventMeta={{ ctaId: 'faq_facebook', label: 'Facebook' }}
              className="text-neon-pink hover:underline"
            >
              Facebook
            </TrackedLink>
            . We&apos;ll announce registration openings, ticket sales, and event details through all channels.
          </span>
        ),
      },
    ],
  },
];

interface AccordionProps {
  question: string;
  answer: string | React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-surface-muted bg-surface-card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-surface-muted/30 transition-colors duration-200 gap-4"
      >
        <span className="text-text-primary font-medium">{question}</span>
        <span className={`text-neon-green text-xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 text-text-secondary">{answer}</div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    initSessionAttribution();
    trackEvent({ name: 'page_view', meta: { title: 'FAQ' } });
  }, []);

  const toggleItem = (categoryId: string, index: number) => {
    const key = `${categoryId}-${index}`;
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const activeData = faqData.find((cat) => cat.id === activeCategory);

  const getColorClasses = (color: 'green' | 'pink' | 'magenta', isActive: boolean) => {
    if (!isActive) return 'border-surface-muted text-text-muted hover:border-surface-muted/80';
    switch (color) {
      case 'green':
        return 'border-neon-green bg-neon-green/10 text-neon-green';
      case 'pink':
        return 'border-neon-pink bg-neon-pink/10 text-neon-pink';
      case 'magenta':
        return 'border-neon-magenta bg-neon-magenta/10 text-neon-magenta';
    }
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-surface-black via-surface-dark to-surface-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-neon-green/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-neon-pink/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <p className="text-neon-green uppercase tracking-[0.3em] text-sm mb-4 font-display">Got Questions?</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-primary mb-6 tracking-wider">
              FREQUENTLY ASKED <span className="text-neon-pink text-glow-pink">QUESTIONS</span>
            </h1>
            <p className="text-xl text-text-secondary">
              Everything you need to know about Battle Royale—for gymnasts, coaches, judges, spectators, and sponsors.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        <div className="section-container relative z-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {faqData.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 border font-display text-sm tracking-wider transition-all duration-300 cursor-pointer ${getColorClasses(
                  category.color,
                  activeCategory === category.id
                )}`}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Active Category Title */}
          {activeData && (
            <div className="text-center mb-8">
              <h2
                className={`font-display text-3xl tracking-wider ${
                  activeData.color === 'green'
                    ? 'text-neon-green'
                    : activeData.color === 'pink'
                    ? 'text-neon-pink'
                    : 'text-neon-magenta'
                }`}
              >
                {activeData.name.toUpperCase()}
              </h2>
            </div>
          )}

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4">
            {activeData?.items.map((item, index) => (
              <Accordion
                key={`${activeCategory}-${index}`}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.has(`${activeCategory}-${index}`)}
                onToggle={() => toggleItem(activeCategory, index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
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

      <EmailSignupSection />
    </PageLayout>
  );
}
