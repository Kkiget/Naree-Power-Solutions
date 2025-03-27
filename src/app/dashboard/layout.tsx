import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { authOptions } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav user={session.user} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
