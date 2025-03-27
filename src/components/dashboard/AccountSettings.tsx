'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { z } from 'zod';
import { passwordSchema } from '@/lib/validation';

type AccountSettingsProps = {
  user: Session['user'];
};

interface UserSession {
  _id: string;
  userAgent: string;
  ip: string;
  location?: string;
  lastActive: Date;
  createdAt: Date;
  current?: boolean;
}

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

const notificationSchema = z.object({
  emailOnLogin: z.boolean(),
  emailOnPasswordChange: z.boolean(),
  emailOnProfileUpdate: z.boolean(),
});

export default function AccountSettings({ user }: AccountSettingsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'sessions' | 'notifications'>('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [notifications, setNotifications] = useState({
    emailOnLogin: true,
    emailOnPasswordChange: true,
    emailOnProfileUpdate: true,
  });

  useEffect(() => {
    if (activeTab === 'sessions') {
      fetchSessions();
    }
  }, [activeTab]);

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/user/sessions');
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      };

      const validated = profileSchema.parse(data);

      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      setSuccess('Profile updated successfully');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.currentTarget);
      const currentPassword = formData.get('currentPassword') as string;
      const newPassword = formData.get('newPassword') as string;

      passwordSchema.parse(newPassword);

      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) throw new Error('Failed to update password');

      setSuccess('Password updated successfully');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        emailOnLogin: formData.get('emailOnLogin') === 'on',
        emailOnPasswordChange: formData.get('emailOnPasswordChange') === 'on',
        emailOnProfileUpdate: formData.get('emailOnProfileUpdate') === 'on',
      };

      const validated = notificationSchema.parse(data);

      const res = await fetch('/api/user/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) throw new Error('Failed to update notification settings');

      setSuccess('Notification settings updated successfully');
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTerminateSession = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/user/sessions?sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSessions(sessions.filter(session => session._id !== sessionId));
        setSuccess('Session terminated successfully');
      }
    } catch (error) {
      setError('Failed to terminate session');
    }
  };

  const handleTerminateAllSessions = async () => {
    try {
      const res = await fetch('/api/user/sessions', {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchSessions();
        setSuccess('All other sessions terminated successfully');
      }
    } catch (error) {
      setError('Failed to terminate sessions');
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/user', {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete account');

      router.push('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          {(['profile', 'security', 'sessions', 'notifications'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 bg-red-50 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 text-green-700 p-4 rounded-md">
            {success}
          </div>
        )}

        {activeTab === 'profile' && (
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user.name || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={user.email || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Delete Account</h3>
              <p className="mt-1 text-sm text-gray-500">
                Once you delete your account, it cannot be recovered.
              </p>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            {sessions.map((session) => (
              <div key={session._id} className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {session.current ? 'Current Session' : 'Other Session'}
                    </h4>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Browser: {session.userAgent}</p>
                      <p>Location: {session.location || 'Unknown'}</p>
                      <p>Last active: {new Date(session.lastActive).toLocaleString()}</p>
                      <p>Started: {new Date(session.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <button
                      onClick={() => handleTerminateSession(session._id)}
                      className="text-sm text-red-600 hover:text-red-500"
                    >
                      Terminate
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={handleTerminateAllSessions}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out All Other Devices
            </button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <form onSubmit={handleNotificationUpdate} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="emailOnLogin"
                    name="emailOnLogin"
                    type="checkbox"
                    defaultChecked={notifications.emailOnLogin}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="emailOnLogin" className="text-sm font-medium text-gray-700">
                    Email me when there's a new login
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive notifications when your account is accessed from a new device or location.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="emailOnPasswordChange"
                    name="emailOnPasswordChange"
                    type="checkbox"
                    defaultChecked={notifications.emailOnPasswordChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="emailOnPasswordChange" className="text-sm font-medium text-gray-700">
                    Email me when my password changes
                  </label>
                  <p className="text-sm text-gray-500">
                    Get notified whenever your password is changed.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="emailOnProfileUpdate"
                    name="emailOnProfileUpdate"
                    type="checkbox"
                    defaultChecked={notifications.emailOnProfileUpdate}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="emailOnProfileUpdate" className="text-sm font-medium text-gray-700">
                    Email me when my profile is updated
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive notifications when changes are made to your profile information.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Notification Preferences'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
