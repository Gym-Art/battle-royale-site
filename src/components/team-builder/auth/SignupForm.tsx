'use client';

import { signUp } from '@/lib/firebase/auth';
import { autoSignInBattleRoyaleUser } from '@/lib/firestore/battleRoyaleUsers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signupSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    displayName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setError(null);
    setLoading(true);

    try {
      const user = await signUp(data.email, data.password, data.displayName);
      // Auto-create user profile
      await autoSignInBattleRoyaleUser(user);
      router.push('/team-builder');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-text-primary mb-1">
          Display Name (optional)
        </label>
        <input
          id="displayName"
          type="text"
          {...register('displayName')}
          className="input-neon w-full px-3 py-2 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="input-neon w-full px-3 py-2 rounded-md"
        />
        {errors.email && <p className="mt-1 text-sm text-neon-pink">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="input-neon w-full px-3 py-2 rounded-md"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-neon-pink">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-text-primary mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="input-neon w-full px-3 py-2 rounded-md"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-neon-pink">{errors.confirmPassword.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-surface-muted border border-neon-pink rounded-md">
          <p className="text-sm text-neon-pink">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow focus:outline-none focus:ring-2 focus:ring-neon-green disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>

      <div className="text-center text-sm">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-neon-green hover:text-neon-yellow transition-colors"
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
}

