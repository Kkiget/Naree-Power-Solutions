import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AccountSettings from '@/components/dashboard/AccountSettings';
import { authOptions } from '@/lib/auth';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
      <AccountSettings user={session.user} />
    </div>
  );
}
