'use client';

import { BR_EVENTS } from '@/data/brEvents';
import { useEffect, useState } from 'react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('br1');
  const [result, setResult] = useState<{ age: number; eligible: boolean } | null>(null);

  useEffect(() => {
    if (!birthDate) {
      setResult(null);
      return;
    }

    const birth = new Date(birthDate);
    const event = BR_EVENTS.find((e) => e.id === selectedEvent);
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
        <div
          className={`p-3 rounded ${
            result.eligible ? 'bg-neon-green/10 border border-neon-green/30' : 'bg-red-500/10 border border-red-500/30'
          }`}
        >
          <p className="text-text-primary">
            You will be{' '}
            <span className={`font-bold ${result.eligible ? 'text-neon-green' : 'text-red-400'}`}>
              {result.age} years old
            </span>{' '}
            on event day.
          </p>
          <p className={`text-sm mt-1 ${result.eligible ? 'text-neon-green' : 'text-red-400'}`}>
            {result.eligible
              ? '✓ You meet the age requirement!'
              : '✗ You must be at least 16 years old on event day.'}
          </p>
        </div>
      )}
    </div>
  );
};

