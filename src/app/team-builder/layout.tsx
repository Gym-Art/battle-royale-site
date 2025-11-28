'use client';

import { AuthGuard } from '@/components/team-builder/layout/AuthGuard';
import { TeamBuilderLayout } from '@/components/team-builder/layout/TeamBuilderLayout';
import { usePathname } from 'next/navigation';

export default function TeamBuilderRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/team-builder/login';

  // Login page should not be wrapped by AuthGuard or TeamBuilderLayout
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <TeamBuilderLayout>{children}</TeamBuilderLayout>
    </AuthGuard>
  );
}

