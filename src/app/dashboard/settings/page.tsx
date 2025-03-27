import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AccountSettings from '@/components/dashboard/AccountSettings';

export default async function SettingsPage() {
  const session = await auth();

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
