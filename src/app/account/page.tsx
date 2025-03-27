'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { ExtendedUser } from '@/types/auth'

export default function AccountPage() {
  const { data: session, status } = useSession()
  const [profile, setProfile] = useState<ExtendedUser['profile'] | null>(null)

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Use type assertion with a more specific type
      const userProfile = ((session.user as unknown) as { profile: ExtendedUser['profile'] }).profile || null;
      setProfile(userProfile);
    }
  }, [status, session])

  if (status === 'loading') {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your account</h1>
          <p className="text-gray-600">Click the sign-in button in the navigation menu to continue.</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return <div className="h-screen flex items-center justify-center">Loading profile...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="ml-2">{profile.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">User ID:</span>
                  <span className="ml-2">{profile.userId}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2">{session?.user?.email || ''}</span>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Addresses</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Billing Address</h3>
                  <div className="space-y-2">
                    <p>{profile.address.billing.fullName}</p>
                    <p>{profile.address.billing.street}</p>
                    <p>{`${profile.address.billing.city}, ${profile.address.billing.state} ${profile.address.billing.zip}`}</p>
                    <p>{profile.address.billing.country}</p>
                    <p>{profile.address.billing.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
                  <div className="space-y-2">
                    <p>{profile.address.shipping.fullName}</p>
                    <p>{profile.address.shipping.street}</p>
                    <p>{`${profile.address.shipping.city}, ${profile.address.shipping.state} ${profile.address.shipping.zip}`}</p>
                    <p>{profile.address.shipping.country}</p>
                    <p>{profile.address.shipping.phone}</p>
                    {profile.address.shipping.instructions && (
                      <p className="text-sm text-gray-600">Instructions: {profile.address.shipping.instructions}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h2>
              <div className="space-y-4">
                {profile.paymentMethods.map((method, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">{method.brand} •••• {method.last4}</p>
                        <p className="text-sm text-gray-500">Expires: {method.expiry}</p>
                      </div>
                      {method.default && (
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-700">Language:</span>
                  <span className="ml-2">{profile.preferences.language}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Currency:</span>
                  <span className="ml-2">{profile.preferences.currency}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Newsletter:</span>
                  <span className="ml-2">{profile.preferences.newsletter ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Marketing:</span>
                  <span className="ml-2">{profile.preferences.marketing ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
