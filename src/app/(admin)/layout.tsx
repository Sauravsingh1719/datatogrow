'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. If we are ALREADY on the signin page, stop loading and let the page render.
    if (pathname?.includes('/signin')) {
      setLoading(false);
      return;
    }

    // 2. Wait for NextAuth to determine session status
    if (status === 'loading') return;
    
    // 3. If not admin, kick them out
    if (!session || session.user.role !== 'admin') {
      router.push('/admin/signin');
    } else {
      // 4. If admin, show the dashboard
      setLoading(false);
    }
  }, [session, status, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}