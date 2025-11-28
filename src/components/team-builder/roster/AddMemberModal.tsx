'use client';

import type { BattleRoyaleTeamMemberRole, BattleRoyaleTeamMemberSportType } from '@/types/battleRoyaleTeamMember';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const memberSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be 50 characters or less'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be 50 characters or less'),
  email: z.string().email('Invalid email address').optional().nullable().or(z.literal('')),
  role: z.enum(['athlete', 'coach', 'staff']),
  sportType: z.enum(['MAG', 'WAG', 'Other']).optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
});

type MemberFormData = z.infer<typeof memberSchema>;

interface AddMemberModalProps {
  teamId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemberFormData) => Promise<void>;
}

export function AddMemberModal({ teamId, isOpen, onClose, onSave }: AddMemberModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: 'athlete',
      sportType: null,
      dateOfBirth: null,
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: MemberFormData) => {
    setIsSaving(true);
    setError(null);

    try {
      await onSave({
        ...data,
        email: data.email || null,
        sportType: data.sportType || null,
        dateOfBirth: data.dateOfBirth || null,
      });
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add member');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-card border border-surface-muted rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-display font-bold text-neon-green uppercase tracking-wider mb-4">
          Add Team Member
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-surface-muted border border-neon-pink rounded-md">
            <p className="text-sm text-neon-pink">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-1">
                First Name <span className="text-neon-pink">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                {...register('firstName')}
                className="input-neon w-full px-3 py-2 rounded-md"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-neon-pink">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-1">
                Last Name <span className="text-neon-pink">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                {...register('lastName')}
                className="input-neon w-full px-3 py-2 rounded-md"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-neon-pink">{errors.lastName.message}</p>
              )}
            </div>
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
            {errors.email && (
              <p className="mt-1 text-sm text-neon-pink">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-1">
              Role <span className="text-neon-pink">*</span>
            </label>
            <select
              id="role"
              {...register('role')}
              className="input-neon w-full px-3 py-2 rounded-md"
            >
              <option value="athlete">Athlete</option>
              <option value="coach">Coach</option>
              <option value="staff">Staff</option>
            </select>
            {errors.role && <p className="mt-1 text-sm text-neon-pink">{errors.role.message}</p>}
          </div>

          <div>
            <label htmlFor="sportType" className="block text-sm font-medium text-text-primary mb-1">
              Sport Type
            </label>
            <select
              id="sportType"
              {...register('sportType')}
              className="input-neon w-full px-3 py-2 rounded-md"
            >
              <option value="">None</option>
              <option value="MAG">MAG</option>
              <option value="WAG">WAG</option>
              <option value="Other">Other</option>
            </select>
            {errors.sportType && (
              <p className="mt-1 text-sm text-neon-pink">{errors.sportType.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-text-primary mb-1">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth')}
              className="input-neon w-full px-3 py-2 rounded-md"
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-neon-pink">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 px-4 py-2 text-sm text-text-primary hover:text-neon-green border border-surface-muted rounded-md hover:border-neon-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 text-sm bg-neon-green text-text-dark rounded-md hover:bg-neon-yellow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

