'use client';

import { GoogleAuthButton } from '@/components/team-builder/auth/GoogleAuthButton';
import { LoginForm } from '@/components/team-builder/auth/LoginForm';
import { SignupForm } from '@/components/team-builder/auth/SignupForm';
import { onAuthStateChange } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        // Auto-create user profile if it doesn't exist
        const { autoSignInBattleRoyaleUser } = await import('@/lib/firestore/battleRoyaleUsers');
        await autoSignInBattleRoyaleUser(user);
        router.push('/team-builder');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-surface-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-5xl font-display font-bold text-neon-green mb-2 tracking-wider uppercase">
            BATTLE ROYALE
          </h1>
          <h2 className="text-center text-3xl font-display font-bold text-neon-pink mb-4 tracking-wider uppercase">
            TEAM BUILDER
          </h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            {isSignup ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="bg-surface-card border border-surface-muted rounded-lg p-6">
            <GoogleAuthButton />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-muted" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface-card text-text-secondary">Or continue with email</span>
              </div>
            </div>
            {isSignup ? (
              <SignupForm onSwitchToLogin={() => setIsSignup(false)} />
            ) : (
              <LoginForm onSwitchToSignup={() => setIsSignup(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

