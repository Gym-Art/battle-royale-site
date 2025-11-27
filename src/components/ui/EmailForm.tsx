'use client';

import { trackEvent } from '@/analytics/analytics';
import { getSessionAttribution } from '@/analytics/session';
import { siteConfig } from '@/config/site';
import React, { useState } from 'react';
import { Button } from './Button';

export const EmailForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!email) return;

    const attribution = getSessionAttribution();
    setStatus('submitting');

    trackEvent({
      name: 'email_signup_submitted',
      meta: { listId: siteConfig.emailSignupTargetListId },
    });

    try {
      const res = await fetch('/api/email-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          listId: siteConfig.emailSignupTargetListId,
          sessionId: attribution?.sessionId,
          campaignId: attribution?.campaignId,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      setEmail('');
      trackEvent({
        name: 'email_signup_success',
        meta: { listId: siteConfig.emailSignupTargetListId },
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md relative">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 bg-surface-dark border border-surface-muted text-text-primary placeholder-text-muted 
                   focus:outline-none focus:border-neon-green focus:shadow-[0_0_10px_rgba(57,255,20,0.3)] 
                   transition-all duration-300 font-body"
        disabled={status === 'submitting'}
      />
      <Button type="submit" disabled={status === 'submitting'} variant="primary">
        {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
      </Button>
      
      {status === 'success' && (
        <p className="absolute -bottom-8 left-0 text-neon-green text-sm text-glow-green">
          You're on the list.
        </p>
      )}
      {status === 'error' && (
        <p className="absolute -bottom-8 left-0 text-neon-pink text-sm">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
};
