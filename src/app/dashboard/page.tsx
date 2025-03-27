import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {session?.user?.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold mb-2">Profile</h3>
          <p>Manage your account settings and preferences</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-bold mb-2">Projects</h3>
          <p>View and manage your solar projects</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="font-bold mb-2">Energy Stats</h3>
          <p>Monitor your energy production and savings</p>
        </div>
      </div>
    </div>
  );
}
