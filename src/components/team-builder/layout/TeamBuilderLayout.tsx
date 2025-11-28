'use client';

import { onAuthStateChange, signOut } from '@/lib/firebase/auth';
import type { BattleRoyaleUserProfile } from '@/types/battleRoyaleUser';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TeamBuilderLayoutProps {
  children: React.ReactNode;
}

export function TeamBuilderLayout({ children }: TeamBuilderLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<BattleRoyaleUserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      setUser(authUser);
      if (authUser) {
        // Auto-create user profile if it doesn't exist (similar to Gym Art Meets autoSignIn)
        const { autoSignInBattleRoyaleUser } = await import('@/lib/firestore/battleRoyaleUsers');
        const profile = await autoSignInBattleRoyaleUser(authUser);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/team-builder/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-surface-black">
      <header className="bg-surface-card border-b border-surface-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/team-builder')}
                className="text-xl font-display font-bold text-neon-green uppercase tracking-wider hover:text-neon-yellow transition-colors"
              >
                Battle Royale Team Builder
              </button>
            </div>
            <div className="flex items-center gap-4">
              {userProfile && (
                <span className="text-sm text-text-secondary">
                  {userProfile.displayName || userProfile.email}
                </span>
              )}
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm text-text-primary hover:text-neon-pink border border-surface-muted rounded-md hover:border-neon-pink transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}

