import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ShopNavigation from '@/modules/shop/components/ShopNavigation';
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
      <ShopNavigation user={session.user} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
