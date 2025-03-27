'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function AccountPage() {
  const { data: session, update } = useSession()
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleProfileUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setProfileError(null)
    setProfileSuccess(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    }

    try {
      const validatedData = profileSchema.parse(data)
      
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      await update({ ...session, user: { ...session?.user, ...validatedData } })
      setProfileSuccess('Profile updated successfully')
    } catch (error) {
      if (error instanceof z.ZodError) {
        setProfileError(error.errors[0].message)
      } else if (error instanceof Error) {
        setProfileError(error.message)
      } else {
        setProfileError('An error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setPasswordError(null)
    setPasswordSuccess(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      currentPassword: formData.get('currentPassword') as string,
      newPassword: formData.get('newPassword') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    try {
      const validatedData = passwordSchema.parse(data)
      
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: validatedData.currentPassword,
          newPassword: validatedData.newPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      setPasswordSuccess('Password updated successfully')
      e.currentTarget.reset()
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.errors[0].message)
      } else if (error instanceof Error) {
        setPasswordError(error.message)
      } else {
        setPasswordError('An error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) return null

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
      
      <div className="mt-6 space-y-8 divide-y divide-gray-200">
        {/* Profile Section */}
        <div className="space-y-6 pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
            <p className="mt-1 text-sm text-gray-500">
              Update your personal information.
            </p>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            {profileError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-sm text-red-700">{profileError}</p>
              </div>
            )}
            {profileSuccess && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <p className="text-sm text-green-700">{profileSuccess}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={session.user.name || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                defaultValue={session.user.email || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Password Section */}
        <div className="space-y-6 pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Password</h3>
            <p className="mt-1 text-sm text-gray-500">
              Update your password.
            </p>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            {passwordError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-sm text-red-700">{passwordError}</p>
              </div>
            )}
            {passwordSuccess && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <p className="text-sm text-green-700">{passwordSuccess}</p>
              </div>
            )}

            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 