import { AgeCalculator } from '@/components/faq/AgeCalculator';
import { ScoreFormula } from '@/components/faq/ScoreFormula';
import { SocialLinks } from '@/components/faq/SocialLinks';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { siteConfig } from '@/config/site';
import React from 'react';

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface FAQCategory {
  id: string;
  name: string;
  color: 'green' | 'pink' | 'yellow';
  items: FAQItem[];
}

type TranslationFunction = (key: string, params?: Record<string, any>) => string;

export const getFAQData = (t?: TranslationFunction): FAQCategory[] => {
  // Helper to get translation or fallback to English
  const tr = (key: string, fallback: string): string => {
    if (!t) return fallback;
    try {
      return t(key) || fallback;
    } catch {
      return fallback;
    }
  };

  return [
  {
    id: 'general',
    name: t ? t('categories.general') : 'General',
    color: 'green',
    items: [
      {
        question: tr('general.whatIsBattleRoyale.question', 'What is Battle Royale?'),
        answer: tr('general.whatIsBattleRoyale.answer', 'Battle Royale is the first professional gymnastics league, designed for spectators first. It features mixed-gender teams, normalized scoring out of 10, real cash prizes (in CAD), and a single-day elimination format that makes gymnastics easy to follow and exciting to watch.'),
      },
      {
        question: tr('general.whoOrganizes.question', 'Who organizes Battle Royale?'),
        answer: tr('general.whoOrganizes.answer', 'Battle Royale is produced by Gym Art Inc., the company behind Gym Art Meets—an end-to-end platform for gymnastics competition management.'),
      },
      {
        question: tr('general.whenAndWhere.question', 'When and where are events held?'),
        answer: tr('general.whenAndWhere.answer', 'Season 1 runs from November 2026 to June 2027 with 4 events held in Ontario and Quebec, Canada. The first event (BR 1) is November 21, 2026. A proof of concept event is scheduled for June 21, 2026.'),
      },
      {
        question: tr('general.howDifferent.question', 'How is Battle Royale different from traditional gymnastics competitions?'),
        answer: tr('general.howDifferent.answer', 'Traditional competitions span multiple days, separate men and women, use confusing scoring systems, and rely on gymnast registration for revenue. Battle Royale is a single-day spectacle with mixed teams, normalized scores out of 10, cash prizes, and a format designed for entertainment.'),
      },
      {
        question: tr('general.prizePool.question', 'What is the prize pool?'),
        answer: tr('general.prizePool.answer', '$25,000 CAD per event, split as: 1st place $15,000 CAD, 2nd place $7,500 CAD, 3rd place $2,500 CAD. Teams finishing 4th–8th receive exclusive Battle Royale merchandise. Year 1 total: $100,000 CAD in prizes across 4 events.'),
      },
      {
        question: tr('general.affiliated.question', 'Is this affiliated with any gymnastics federation?'),
        answer: tr('general.affiliated.answer', 'Battle Royale is an independent invitational competition. While we use FIG (International Gymnastics Federation) judging standards and Code of Points, we are not a federation-sanctioned qualification event. This gives us the freedom to innovate on format and scoring.'),
      },
    ],
  },
  {
    id: 'gymnasts',
    name: t ? t('categories.gymnasts') : 'For Gymnasts',
    color: 'pink',
    items: [
      {
        question: tr('gymnasts.whoCanCompete.question', 'Who can compete?'),
        answer: (
          <span>
            {tr('gymnasts.whoCanCompete.text', 'Any gymnast aged 16+ on the day of the event who can perform FIG-level routines. No federation membership required. No qualification requirements. Open invitational format.')} <SocialLinks />
          </span>
        ),
      },
      {
        question: tr('gymnasts.ageRequirements.question', 'What are the age requirements?'),
        answer: (
          <div>
            <p>{tr('gymnasts.ageRequirements.text', 'Athletes must be at least 16 years old on the day of the event. There is no upper age limit.')}</p>
            <AgeCalculator />
          </div>
        ),
      },
      {
        question: tr('gymnasts.skillLevel.question', 'What skill level is required?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('gymnasts.skillLevel.p1', 'Athletes should be capable of performing FIG Senior-level routines. This typically means competitive Level 10, Elite, or NCAA-level gymnasts for WAG, and Level 10 or Elite for MAG.')}
            </p>
            <p className="mb-3">{tr('gymnasts.skillLevel.p2', 'A FIG routine consists of 6-8 elements from the FIG Code of Points.')}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <TrackedLink
                href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1%20-%20MAG%20CoP%202025-2028.pdf"
                eventMeta={{ ctaId: 'faq_mag_cop', label: 'MAG Code of Points' }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
              >
                <span>📄</span> {tr('gymnasts.skillLevel.magCop', 'MAG Code of Points (2025-2028)')}
              </TrackedLink>
              <TrackedLink
                href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1.%20WAG%20Code%20of%20Points%202025-2028.pdf"
                eventMeta={{ ctaId: 'faq_wag_cop', label: 'WAG Code of Points' }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 text-neon-pink hover:bg-neon-pink/20 transition-colors"
              >
                <span>📄</span> {tr('gymnasts.skillLevel.wagCop', 'WAG Code of Points (2025-2028)')}
              </TrackedLink>
            </div>
          </div>
        ),
      },
      {
        question: tr('gymnasts.howToRegister.question', 'How do I register?'),
        answer: (
          <span>
            {tr('gymnasts.howToRegister.text', 'Registration opens on the Gym Art Meets platform 4 months before each event. Teams register together, listing all gymnasts and coaches.')} <SocialLinks />
          </span>
        ),
      },
      {
        question: tr('gymnasts.registrationCost.question', 'How much does registration cost?'),
        answer: tr('gymnasts.registrationCost.answer', '$250 CAD per gymnast, $150 CAD per coach. Early bird discounts and dynamic pricing may apply based on demand.'),
      },
      {
        question: tr('gymnasts.howTeamsWork.question', 'How do teams work?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('gymnasts.howTeamsWork.p1', 'Teams need a minimum of 3 gymnasts with no maximum size. Teams can be all women, all men, or any mix. Gymnasts from different clubs can form teams together—there are no club or federation restrictions.')}
            </p>
            <div className="p-3 bg-neon-yellow/10 border border-neon-yellow/30 rounded mt-3">
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-1">{tr('gymnasts.howTeamsWork.nationalTeamLimit.title', 'NATIONAL TEAM LIMIT')}</p>
              <p className="text-text-secondary">
                {tr('gymnasts.howTeamsWork.nationalTeamLimit.text', 'To prevent "super teams" in the early seasons, each team may only include')}{' '}
                <span className="text-text-primary font-semibold">{tr('gymnasts.howTeamsWork.nationalTeamLimit.highlight', 'one current national team member')}</span>. {tr('gymnasts.howTeamsWork.nationalTeamLimit.suffix', 'This ensures competitive balance and gives all teams a fair chance.')}
              </p>
            </div>
          </div>
        ),
      },
      {
        question: tr('gymnasts.apparatuses.question', 'What apparatuses are used?'),
        answer: (
          <div>
            <p className="mb-3">
              <span className="text-neon-pink font-semibold">{tr('gymnasts.apparatuses.wag', 'WAG (4 events):')}</span> {tr('gymnasts.apparatuses.wagList', 'Vault, Uneven Bars, Balance Beam, Floor Exercise')}
            </p>
            <p className="mb-3">
              <span className="text-neon-green font-semibold">{tr('gymnasts.apparatuses.mag', 'MAG (4 events):')}</span> {tr('gymnasts.apparatuses.magList', 'Vault, Floor Exercise, Still Rings, High Bar')}
            </p>
            <p className="mb-3">{tr('gymnasts.apparatuses.mixed', 'Mixed teams can use any combination of these 8 apparatus.')}</p>
            <div className="p-3 bg-surface-muted/30 border border-surface-muted rounded mt-3">
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-1">
                {tr('gymnasts.apparatuses.whyNoPommel.title', 'WHY NO POMMEL HORSE OR PARALLEL BARS?')}
              </p>
              <p className="text-text-secondary">
                {tr('gymnasts.apparatuses.whyNoPommel.p1', 'We\'ve streamlined the men\'s apparatus to 4 events to match women\'s gymnastics.')}{' '}
                <span className="text-text-primary">{tr('gymnasts.apparatuses.whyNoPommel.pommelHorse', 'Pommel Horse')}</span> {tr('gymnasts.apparatuses.whyNoPommel.p1Suffix', 'was removed because it\'s often the trickiest event for gymnasts and prone to falls.')} <span className="text-text-primary">{tr('gymnasts.apparatuses.whyNoPommel.parallelBars', 'Parallel Bars')}</span>{' '}
                {tr('gymnasts.apparatuses.whyNoPommel.p2', 'was removed because routines take the longest—and we\'re focused on an action-packed spectator experience.')}
              </p>
              <p className="text-text-secondary mt-2">
                {tr('gymnasts.apparatuses.whyNoPommel.p3', 'We kept')} <span className="text-neon-green">{tr('gymnasts.apparatuses.whyNoPommel.stillRings', 'Still Rings')}</span> {tr('gymnasts.apparatuses.whyNoPommel.stillRingsNote', '(iconic strength event),')}{' '}
                <span className="text-neon-green">{tr('gymnasts.apparatuses.whyNoPommel.highBar', 'High Bar')}</span> {tr('gymnasts.apparatuses.whyNoPommel.highBarNote', '(spectacular releases and dismounts), plus Vault and Floor (shared with women\'s).')}
              </p>
            </div>
          </div>
        ),
      },
      {
        question: tr('gymnasts.apparelRequirements.question', 'What are the apparel requirements?'),
        answer: tr('gymnasts.apparelRequirements.answer', 'No singlet requirement. Teams must have 2 main team colors and wear matching, non-baggy attire. Express your team\'s identity however you want—this is about entertainment and team spirit.'),
      },
      {
        question: tr('gymnasts.clubOrFederation.question', 'Do I need to be part of a club or federation?'),
        answer: tr('gymnasts.clubOrFederation.answer', 'No. Battle Royale is open to all eligible gymnasts regardless of club affiliation or federation membership. You can compete as an independent athlete on any team.'),
      },
      {
        question: tr('gymnasts.multipleTeams.question', 'Can I compete on multiple teams?'),
        answer: tr('gymnasts.multipleTeams.answer', 'No. Each gymnast may only compete on one team per event.'),
      },
      {
        question: tr('gymnasts.whatRoutines.question', 'What routines should I prepare?'),
        answer: tr('gymnasts.whatRoutines.answer', 'Prepare your existing FIG-level routines. No changes needed. You\'ll be judged using standard FIG Code of Points, then scores are normalized for fair comparison.'),
      },
      {
        question: tr('gymnasts.scoreNormalization.question', 'How does score normalization work?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('gymnasts.scoreNormalization.text', 'Your standard FIG score is scaled based on the highest possible start value for that apparatus, resulting in a final score out of 10. This makes scores instantly understandable and allows fair comparison across all apparatus (beam vs high bar, WAG vs MAG).')}
            </p>
            <ScoreFormula />
          </div>
        ),
      },
      {
        question: tr('gymnasts.competitionStructure.question', 'How is the competition structured?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('gymnasts.competitionStructure.p1', 'Single-day elimination format:')} <span className="text-neon-green font-semibold">{tr('gymnasts.competitionStructure.qualification', 'Qualification')}</span> {tr('gymnasts.competitionStructure.qualificationTime', '(9:00 AM - 3:00 PM, 64 teams, 8 routines each)')} → <span className="text-neon-pink font-semibold">{tr('gymnasts.competitionStructure.semiFinals', 'Semi-Finals')}</span>{' '}
              {tr('gymnasts.competitionStructure.semiFinalsTime', '(6:00 PM - 7:30 PM, top 12 teams, 6 routines each)')} → <span className="text-neon-yellow font-semibold">{tr('gymnasts.competitionStructure.finals', 'Finals')}</span>{' '}
              {tr('gymnasts.competitionStructure.finalsTime', '(8:00 PM - 8:30 PM, top 4 teams, 4 routines each). Highest total score wins.')}
            </p>
            <p className="mb-3 text-text-secondary">
              {tr('gymnasts.competitionStructure.p2', 'Qualification consists of four 80-minute rounds. All routine scores count toward your team total. Each team may only perform 2 routines per apparatus.')}
            </p>
            <div className="p-3 bg-neon-green/10 border border-neon-green/30 rounded">
              <p className="text-neon-green font-display text-sm tracking-wider mb-1">
                {tr('gymnasts.competitionStructure.appointmentScheduling.title', 'APPOINTMENT-BASED SCHEDULING')}
              </p>
              <p className="text-text-secondary">
                {tr('gymnasts.competitionStructure.appointmentScheduling.text', 'Unlike traditional rotation-based competitions, Battle Royale uses appointment-based scheduling. Each athlete receives a specific time slot for their routine (e.g., "Athlete A: Uneven Bars at 9:05 AM"). Multiple athletes may compete simultaneously on different apparatus. Detailed schedules are released close to the event.')}
              </p>
            </div>
          </div>
        ),
      },
      {
        question: tr('gymnasts.howManyRoutines.question', 'How many routines does my team perform?'),
        answer: tr('gymnasts.howManyRoutines.answer', 'Qualification: 8 routines (max 2 per apparatus). Semi-Finals: 6 routines (max 2 per apparatus, 1 vault). Finals: 4 routines (max 2 per apparatus).'),
      },
      {
        question: tr('gymnasts.whatHappensIfFall.question', 'What happens if I fall during a routine?'),
        answer: tr('gymnasts.whatHappensIfFall.answer', 'Falls are deducted per standard FIG rules. In semi-finals and finals, each athlete has 120 seconds to complete their routine—no extra time is given for falls. Skills performed after the time limit don\'t count.'),
      },
      {
        question: tr('gymnasts.timeLimit.question', 'What is the time limit per routine?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('gymnasts.timeLimit.p1', 'Standard FIG time limits apply during qualification. In semi-finals and finals, there\'s a 120-second hard limit per routine with no extensions.')}
            </p>
            <p className="text-text-secondary">
              {tr('gymnasts.timeLimit.p2', 'Remember: Battle Royale uses appointment-based scheduling, not rotations. You\'ll know exactly when you compete—check the')}{' '}
              <TrackedLink
                href="/schedule"
                eventMeta={{ ctaId: 'faq_schedule_link', label: 'Schedule Link' }}
                className="text-neon-green hover:underline"
              >
                {tr('gymnasts.timeLimit.schedulePage', 'schedule page')}
              </TrackedLink>{' '}
              {tr('gymnasts.timeLimit.p2Suffix', 'for event dates.')}
            </p>
          </div>
        ),
      },
      {
        question: tr('gymnasts.prizesDistributed.question', 'How are prizes distributed?'),
        answer: tr('gymnasts.prizesDistributed.answer', 'Prize money goes to the team. How teams divide winnings internally is up to them. 1st: $15,000 CAD, 2nd: $7,500 CAD, 3rd: $2,500 CAD. Teams 4th–8th receive merchandise prizes.'),
      },
    ],
  },
  {
    id: 'coaches',
    name: t ? t('categories.coaches') : 'For Coaches',
    color: 'yellow',
    items: [
      {
        question: tr('coaches.registerAthletes.question', 'How do I register my athletes?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('coaches.registerAthletes.p1', 'Register your team through the Gym Art Meets platform when registration opens. You\'ll need:')}
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 text-text-secondary">
              <li>
                <span className="text-text-primary">{tr('coaches.registerAthletes.fullName', 'Full name')}</span> {tr('coaches.registerAthletes.fullNameSuffix', 'for each athlete')}
              </li>
              <li>
                <span className="text-text-primary">{tr('coaches.registerAthletes.teamName', 'Team name')}</span> {tr('coaches.registerAthletes.or', 'and')} <span className="text-text-primary">{tr('coaches.registerAthletes.teamColors', 'team colors/brand')}</span>
              </li>
              <li>
                <span className="text-text-primary">{tr('coaches.registerAthletes.registrationFees', 'Registration fees')}</span> {tr('coaches.registerAthletes.registrationFeesSuffix', '($250 CAD per gymnast, $150 CAD per coach)')}
              </li>
              <li>
                {tr('coaches.registerAthletes.paymentVia', 'Payment via')} <span className="text-text-primary">{tr('coaches.registerAthletes.creditCard', 'credit card')}</span> {tr('coaches.registerAthletes.or', 'or')}{' '}
                <span className="text-text-primary">{tr('coaches.registerAthletes.bankTransfer', 'bank transfer')}</span>
              </li>
            </ul>
            <p className="mb-3 text-text-secondary">
              <span className="text-neon-yellow font-semibold">{tr('coaches.registerAthletes.registrationOpens', 'Registration opens:')}</span> {tr('coaches.registerAthletes.br1', 'BR 1 (July 2026), BR 2 (August 2026), BR 3 (November 2026), BR 4 (January 2027)')}
            </p>
            <TrackedLink
              href="/schedule"
              eventMeta={{ ctaId: 'faq_coach_schedule', label: 'View Schedule' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
            >
              {tr('coaches.registerAthletes.viewSchedule', 'View Full Schedule →')}
            </TrackedLink>
          </div>
        ),
      },
      {
        question: tr('coaches.coachFee.question', 'What is the coach registration fee?'),
        answer: tr('coaches.coachFee.answer', '$150 CAD per coach. Each team should have at least one registered coach for floor access and athlete support.'),
      },
      {
        question: tr('coaches.multipleTeams.question', 'Can I coach multiple teams?'),
        answer: tr('coaches.multipleTeams.answer', 'Yes, coaches may be registered with multiple teams at the same event, though scheduling conflicts during competition are your responsibility to manage.'),
      },
      {
        question: tr('coaches.roleDuringCompetition.question', 'What is my role during competition?'),
        answer: tr('coaches.roleDuringCompetition.answer', 'Coaches have floor access to support their athletes, similar to traditional competitions. You\'ll help with warm-ups, provide spotting where allowed, and support athletes between routines.'),
      },
      {
        question: tr('coaches.certifications.question', 'Do I need specific certifications?'),
        answer: tr('coaches.certifications.answer', 'While specific certification requirements are being finalized, we recommend coaches have standard gymnastics coaching credentials (NCCP, USAG, or equivalent). Safety certifications may be required for spotting.'),
      },
      {
        question: tr('coaches.warmUps.question', 'How do warm-ups work?'),
        answer: tr('coaches.warmUps.answer', 'Teams will have scheduled warm-up times before their competition rounds. Detailed warm-up schedules will be provided closer to each event. The single-day format means efficient warm-up rotations.'),
      },
    ],
  },
  {
    id: 'judges',
    name: t ? t('categories.judges') : 'For Judges',
    color: 'green',
    items: [
      {
        question: tr('judges.judgingStructure.question', 'How is judging structured?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('judges.judgingStructure.p1', 'In the qualification round, we use')} <span className="text-neon-green font-semibold">{tr('judges.judgingStructure.twoPanels', 'two panels per event')}</span>
              {tr('judges.judgingStructure.p1Suffix', ', with each panel consisting of')} <span className="text-neon-green font-semibold">{tr('judges.judgingStructure.oneJudge', 'one judge')}</span> {tr('judges.judgingStructure.p1Suffix2', 'who evaluates both Difficulty and Execution for maximum speed.')}
            </p>
            <p className="mb-3 text-text-secondary">
              {tr('judges.judgingStructure.p2', 'The system works like this: One gymnast competes, and the moment they finish, the first panel starts judging them. While the first panel is judging, the next gymnast competes while the second panel judges them. When they finish, the panels swap. This means there\'s always someone competing at all times—we must respect strict time restraints.')}
            </p>
            <p className="text-text-secondary">
              {tr('judges.judgingStructure.p3', 'We only select the best of the best judges: those who are fast, accurate, and unbiased. This streamlined approach ensures constant action while maintaining the highest judging standards.')}
            </p>
          </div>
        ),
      },
      {
        question: tr('judges.codeOfPoints.question', 'What code of points is used?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('judges.codeOfPoints.p1', 'FIG Code of Points (current cycle). Judges use the same deductions, difficulty values, and execution standards they\'re already trained on.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <TrackedLink
                href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1%20-%20MAG%20CoP%202025-2028.pdf"
                eventMeta={{ ctaId: 'faq_judge_mag_cop', label: 'MAG Code of Points' }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
              >
                <span>📄</span> {tr('judges.codeOfPoints.magCop', 'MAG CoP 2025-2028')}
              </TrackedLink>
              <TrackedLink
                href="https://www.gymnastics.sport/publicdir/rules/files/en_1.1.%20WAG%20Code%20of%20Points%202025-2028.pdf"
                eventMeta={{ ctaId: 'faq_judge_wag_cop', label: 'WAG Code of Points' }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 text-neon-pink hover:bg-neon-pink/20 transition-colors"
              >
                <span>📄</span> {tr('judges.codeOfPoints.wagCop', 'WAG CoP 2025-2028')}
              </TrackedLink>
            </div>
          </div>
        ),
      },
      {
        question: tr('judges.scoreNormalizationAffect.question', 'How does score normalization affect judging?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('judges.scoreNormalizationAffect.text', 'It doesn\'t affect your judging at all. You judge routines normally using FIG standards. The normalization calculation happens after you submit your scores—it\'s a mathematical transformation applied to make scores comparable across apparatus.')}
            </p>
            <ScoreFormula />
          </div>
        ),
      },
      {
        question: tr('judges.submitScores.question', 'How do judges submit scores?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('judges.submitScores.p1', 'Judges submit scores using the')} <span className="text-neon-green font-semibold">{tr('judges.submitScores.judgesCompanion', 'Judges Companion app')}</span>
              {tr('judges.submitScores.p1Suffix', ', a helper app built into Gym Art Meets. This is our in-house application designed for maximum speed and super easy use.')}
            </p>
            <p className="text-text-secondary">
              {tr('judges.submitScores.p2', 'You simply input an FIG score, and the score normalization happens automatically in the background. On the scoreboard, spectators see the normalized score out of 10—all done seamlessly without changing your judging process.')}
            </p>
          </div>
        ),
      },
      {
        question: tr('judges.assignedApparatus.question', 'Are judges assigned to specific apparatus?'),
        answer: tr('judges.assignedApparatus.answer', 'Yes, judges are assigned to specific apparatus based on their certifications and expertise, similar to traditional FIG competitions.'),
      },
      {
        question: tr('judges.getInvolved.question', 'How can I get involved as a judge?'),
        answer: (
          <span>
            {tr('judges.getInvolved.text', 'We\'re actively recruiting certified FIG judges (brevet or national level). Contact us at')}{' '}
            <TrackedLink
              href={`mailto:${siteConfig.contactEmail}?subject=Judge%20Inquiry`}
              eventMeta={{ ctaId: 'faq_judge_email', label: 'Judge Email' }}
              className="text-neon-green hover:underline"
            >
              {siteConfig.contactEmail}
            </TrackedLink>{' '}
            {tr('judges.getInvolved.suffix', 'with your credentials and availability.')}
          </span>
        ),
      },
    ],
  },
  {
    id: 'spectators',
    name: t ? t('categories.spectators') : 'For Spectators',
    color: 'pink',
    items: [
      {
        question: tr('spectators.buyTickets.question', 'How do I buy tickets?'),
        answer: (
          <span>
            {tr('spectators.buyTickets.text', 'Tickets go on sale 2 months before each event through our website and the Gym Art platform.')} <SocialLinks />
          </span>
        ),
      },
      {
        question: tr('spectators.ticketPrices.question', 'How much are tickets?'),
        answer: tr('spectators.ticketPrices.answer', 'General admission: $30 CAD. Courtside/VIP seating: $150 CAD. Prices may vary for special events.'),
      },
      {
        question: tr('spectators.vipTickets.question', 'What are VIP/courtside tickets?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('spectators.vipTickets.p1', 'VIP/courtside tickets ($150 CAD) offer something that\'s never been done before in gymnastics. VIPs sit from the')} <span className="text-neon-pink font-semibold">{tr('spectators.vipTickets.sameViewpoint', 'same viewpoint as judges')}</span>{tr('spectators.vipTickets.p1Suffix', '—literally')}{' '}
              <span className="text-neon-pink font-semibold">{tr('spectators.vipTickets.distance', '2-3 meters away from the apparatus')}</span>.
            </p>
            <p className="mb-3 text-text-secondary">
              {tr('spectators.vipTickets.p2', 'You\'ll experience the sport alongside the gymnasts in real time, feeling every landing, hearing every breath, seeing every detail up close. It\'s an immersive experience that will blow your mind.')}
            </p>
            <p className="text-text-secondary">
              {tr('spectators.vipTickets.p3', 'Perfect for serious gymnastics fans, photographers, and anyone wanting the most intimate view of elite competition.')}
            </p>
          </div>
        ),
      },
      {
        question: tr('spectators.eventLength.question', 'How long is the event?'),
        answer: tr('spectators.eventLength.answer', 'The full day runs from 9:00 AM to approximately 8:30 PM. Morning qualifications (9 AM – 3 PM) and evening finals (6 PM – 8:30 PM) can be attended separately or together.'),
      },
      {
        question: tr('spectators.eventSchedule.question', 'What is the event schedule?'),
        answer: tr('spectators.eventSchedule.answer', 'Morning (9 AM – 3 PM): Four qualification rounds with 64 teams. Evening (6 PM – 8:30 PM): Semi-finals (12 teams) and Finals (4 teams). The evening session is the main spectacle with higher stakes.'),
      },
      {
        question: tr('spectators.watchOnline.question', 'Can I watch online?'),
        answer: tr('spectators.watchOnline.answer', 'Yes. Event videos will be published on the Gym Art app. Live streaming options are being developed. Online viewing may have a small fee ($8 CAD).'),
      },
      {
        question: tr('spectators.foodAndDrink.question', 'Is food and drink available?'),
        answer: tr('spectators.foodAndDrink.answer', 'Venue-dependent. Most venues will have concessions available. Details will be provided for each specific event location.'),
      },
      {
        question: tr('spectators.familyFriendly.question', 'Are events family-friendly?'),
        answer: tr('spectators.familyFriendly.answer', 'Absolutely. Battle Royale is designed for all ages. The team format and clear scoring make it perfect for introducing kids to competitive gymnastics in an exciting environment.'),
      },
    ],
  },
  {
    id: 'sponsors',
    name: t ? t('categories.sponsors') : 'For Sponsors',
    color: 'yellow',
    items: [
      {
        question: tr('sponsors.sponsorshipOpportunities.question', 'What sponsorship opportunities exist?'),
        answer: tr('sponsors.sponsorshipOpportunities.answer', 'Three main tiers: Cash Prize Partners (support athlete rewards), Merch & Apparel Partners (outfit the competition), and Equipment & Services Partners (provide equipment, technology, or services).'),
      },
      {
        question: tr('sponsors.whatSponsorsReceive.question', 'What do sponsors receive?'),
        answer: tr('sponsors.whatSponsorsReceive.answer', 'Event-day visibility (logo placement, announcements, branded areas), digital presence (website, social media, live stream integration), direct access to the gymnastics community through Gym Art platform, hospitality (VIP access, athlete meet-and-greets), and category exclusivity options.'),
      },
      {
        question: tr('sponsors.becomeSponsor.question', 'How do I become a sponsor?'),
        answer: (
          <span>
            {tr('sponsors.becomeSponsor.text', 'Contact us at')}{' '}
            <TrackedLink
              href={`mailto:${siteConfig.contactEmail}?subject=Sponsorship%20Inquiry`}
              eventMeta={{ ctaId: 'faq_sponsor_email', label: 'Sponsor Email' }}
              className="text-neon-green hover:underline"
            >
              {siteConfig.contactEmail}
            </TrackedLink>{' '}
            {tr('sponsors.becomeSponsor.suffix', 'to discuss partnership opportunities. We\'ll work with you to create a package that meets your goals.')}
          </span>
        ),
      },
      {
        question: tr('sponsors.reachAudience.question', 'What is the reach/audience?'),
        answer: tr('sponsors.reachAudience.answer', 'Gymnastics reached 41.5 million viewers at Paris 2024 (most-watched Olympic sport). Our regional market includes 23,000+ competitive gymnasts and 250,000+ reachable audience members (parents, recreational athletes, coaches) in Ontario, Quebec, and NY/NJ.'),
      },
    ],
  },
  {
    id: 'format',
    name: t ? t('categories.format') : 'Competition Format',
    color: 'green',
    items: [
      {
        question: tr('format.eliminationFormat.question', 'How does the elimination format work?'),
        answer: (
          <div>
            <div className="mb-4">
              <p className="text-neon-green font-display text-sm tracking-wider mb-2">
                {tr('format.eliminationFormat.qualification.title', 'QUALIFICATION (9:00 AM → 3:00 PM)')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                <li>
                  {tr('format.eliminationFormat.qualification.fourRounds', 'There are')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.qualification.fourRounds', 'four qualification rounds')}</span> {tr('format.eliminationFormat.qualification.fourRoundsSuffix', 'in the morning, each lasting')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.qualification.eightyMinutes', '80 minutes')}</span>
                </li>
                <li>
                  {tr('format.eliminationFormat.qualification.eightRoutines', 'Each team must perform')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.qualification.eightRoutines', '8 routines')}</span>
                </li>
                <li>
                  <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.qualification.allScoresCount', 'All scores count')}</span> {tr('format.eliminationFormat.qualification.allScoresCountSuffix', 'towards the team score')}
                </li>
                <li>
                  {tr('format.eliminationFormat.qualification.twoRoutinesPerApparatus', 'Each team may only perform')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.qualification.twoRoutinesPerApparatus', '2 routines per apparatus')}</span>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-neon-pink font-display text-sm tracking-wider mb-2">{tr('format.eliminationFormat.semiFinals.title', 'SEMI-FINALS (6:00 PM → 7:30 PM)')}</p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                <li>
                  {tr('format.eliminationFormat.semiFinals.topTwelve', 'The')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.semiFinals.topTwelve', 'top 12 teams')}</span> {tr('format.eliminationFormat.semiFinals.topTwelveSuffix', 'from Qualification advance to the semi-final')}
                </li>
                <li>
                  {tr('format.eliminationFormat.semiFinals.sixRoutines', 'Each team competes')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.semiFinals.sixRoutines', '6 routines')}</span>{tr('format.eliminationFormat.semiFinals.sixRoutinesSuffix', ', all of which count')}
                </li>
                <li>
                  {tr('format.eliminationFormat.semiFinals.twoRoutinesAndVault', 'Each team may only perform')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.semiFinals.twoRoutinesAndVault', '2 routines per apparatus and one vault')}</span>
                </li>
                <li>
                  {tr('format.eliminationFormat.semiFinals.oneHundredTwentySeconds', 'Each athlete has')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.semiFinals.oneHundredTwentySeconds', '120 seconds')}</span> {tr('format.eliminationFormat.semiFinals.oneHundredTwentySecondsSuffix', 'to complete their routine (no extra time with falls), after which no skills are counted')}
                </li>
              </ul>
            </div>
            <div>
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-2">{tr('format.eliminationFormat.finals.title', 'FINALS (8:00 PM → 8:30 PM)')}</p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                <li>
                  {tr('format.eliminationFormat.finals.finalFour', 'The')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.finals.finalFour', 'final 4 teams')}</span> {tr('format.eliminationFormat.finals.finalFourSuffix', 'gather in the middle of the arena')}
                </li>
                <li>
                  {tr('format.eliminationFormat.finals.fourRoutines', 'Each team must perform')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.finals.fourRoutines', '4 routines')}</span>{tr('format.eliminationFormat.finals.fourRoutinesSuffix', ', all of which count')}
                </li>
                <li>
                  <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.finals.oneAthleteAtTime', 'One athlete competes at a time')}</span>{tr('format.eliminationFormat.finals.oneAthleteAtTimeSuffix', ', starting with Team 1, then Team 2, etc.')}
                </li>
                <li>
                  {tr('format.eliminationFormat.finals.twoRoutinesPerApparatus', 'Each team may only perform')} <span className="text-text-primary font-semibold">{tr('format.eliminationFormat.finals.twoRoutinesPerApparatus', '2 routines per apparatus')}</span>
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        question: tr('format.scoreNormalization.question', 'What is score normalization?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('format.scoreNormalization.text', 'A mathematical transformation that scales FIG scores based on the highest possible start value for each apparatus, resulting in scores out of 10. This allows direct comparison across all apparatus and between WAG and MAG routines.')}
            </p>
            <ScoreFormula />
          </div>
        ),
      },
      {
        question: tr('format.teamsRanked.question', 'How are teams ranked?'),
        answer: tr('format.teamsRanked.answer', 'Teams are ranked by total team score within each round. All routine scores count—there are no drop scores. The team with the highest total at the end of each round advances.'),
      },
      {
        question: tr('format.wagAndMagTogether.question', 'Can WAG and MAG compete together?'),
        answer: tr('format.wagAndMagTogether.answer', 'Yes! This is one of Battle Royale\'s innovations. Score normalization makes it fair for women and men to compete on the same team, comparing beam to high bar, women\'s floor to men\'s floor, etc.'),
      },
      {
        question: tr('format.tiesBroken.question', 'How are ties broken?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('format.tiesBroken.p1', 'We follow')} <span className="text-neon-green font-semibold">{tr('format.tiesBroken.figRegulations', 'FIG regulations')}</span> {tr('format.tiesBroken.p1Suffix', 'for breaking ties:')}
            </p>
            <ol className="list-decimal list-inside space-y-2 text-text-secondary ml-2 mb-4">
              <li>
                {tr('format.tiesBroken.first', 'First, compare')} <span className="text-text-primary font-semibold">{tr('format.tiesBroken.executionScores', 'execution scores')}</span>
              </li>
              <li>
                {tr('format.tiesBroken.then', 'Then, compare')} <span className="text-text-primary font-semibold">{tr('format.tiesBroken.difficultyScores', 'difficulty scores')}</span>
              </li>
            </ol>
            <div className="p-3 bg-neon-yellow/10 border border-neon-yellow/30 rounded">
              <p className="text-neon-yellow font-display text-sm tracking-wider mb-1">{tr('format.tiesBroken.deathMatch.title', 'DEATH MATCH')}</p>
              <p className="text-text-secondary">
                {tr('format.tiesBroken.deathMatch.text', 'If it\'s still a true tie, we go to a')} <span className="text-text-primary font-semibold">{tr('format.tiesBroken.deathMatch.deathMatchHighlight', 'death match')}</span>
                {tr('format.tiesBroken.deathMatch.text2', ': both teams send up')} <span className="text-text-primary font-semibold">{tr('format.tiesBroken.deathMatch.oneAthlete', 'one athlete')}</span> {tr('format.tiesBroken.deathMatch.oneAthleteSuffix', '(or two) to perform routines. The sum of those routines determines the final winner.')}
              </p>
            </div>
          </div>
        ),
      },
      {
        question: tr('format.appointmentScheduling.question', 'What is appointment-based scheduling?'),
        answer: (
          <div>
            <p className="mb-3">
              {tr('format.appointmentScheduling.p1', 'Unlike traditional competitions where teams rotate through apparatus together, Battle Royale uses')}{' '}
              <span className="text-neon-green font-semibold">{tr('format.appointmentScheduling.appointmentBased', 'appointment-based scheduling')}</span>.
            </p>
            <p className="mb-3 text-text-secondary">
              {tr('format.appointmentScheduling.p2', 'Each athlete receives a specific time for their routine. For example: "Athlete A - Uneven Bars at 9:05 AM, Athlete B - Vault at 9:10 AM." Multiple athletes can compete simultaneously on different apparatus.')}
            </p>
            <p className="text-text-secondary">
              {tr('format.appointmentScheduling.p3', 'This creates a more dynamic, action-packed viewing experience with constant activity across the competition floor.')}
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: 'logistics',
    name: t ? t('categories.logistics') : 'Logistics & Schedule',
    color: 'pink',
    items: [
      {
        question: tr('logistics.season1Location.question', 'Where are Season 1 events located?'),
        answer: tr('logistics.season1Location.answer', 'All Season 1 events are in Ontario and Quebec, Canada. Specific venues will be announced as they\'re confirmed. We\'re targeting venues with good spectator capacity and professional gymnastics equipment.'),
      },
      {
        question: tr('logistics.proofOfConcept.question', 'What is the proof of concept event?'),
        answer: tr('logistics.proofOfConcept.answer', 'A limited-capacity showcase event on June 21, 2026, before the official Season 1 launch. This is our inaugural event to demonstrate the format and build excitement. Details TBD.'),
      },
      {
        question: tr('logistics.registrationOpens.question', 'When does registration open?'),
        answer: (
          <span>
            {tr('logistics.registrationOpens.text', 'Registration opens 4 months before each event: BR 1 (July 2026), BR 2 (August 2026), BR 3 (November 2026), BR 4 (January 2027).')} <SocialLinks />
          </span>
        ),
      },
      {
        question: tr('logistics.ticketsOnSale.question', 'When do tickets go on sale?'),
        answer: (
          <span>
            {tr('logistics.ticketsOnSale.text', 'Spectator tickets go on sale 2 months before each event: BR 1 (September 2026), BR 2 (November 2026), BR 3 (January 2027), BR 4 (April 2027).')} <SocialLinks />
          </span>
        ),
      },
      {
        question: tr('logistics.eventCancelled.question', 'What if an event is cancelled?'),
        answer: tr('logistics.eventCancelled.answer', 'In the unlikely event of cancellation, full refunds will be provided for registration and ticket purchases. We have backup venue plans and flexible scheduling (unlike federation events locked to specific dates).'),
      },
      {
        question: tr('logistics.stayUpdated.question', 'How do I stay updated?'),
        answer: (
          <span>
            {tr('logistics.stayUpdated.text', 'Sign up for our email list on this website, follow us on')}{' '}
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
            . {tr('logistics.stayUpdated.suffix', 'We\'ll announce registration openings, ticket sales, and event details through all channels.')}
          </span>
        ),
      },
    ],
  },
  ];
};

