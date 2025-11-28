'use client';

import { signIn } from '@/lib/firebase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setLoading(true);

    try {
      await signIn(data.email, data.password);
      router.push('/team-builder');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="text-center text-sm">
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-neon-green hover:text-neon-yellow transition-colors"
        >
          Don&apos;t have an account? Sign up
        </button>
      </div>
    </form>
  );
}

