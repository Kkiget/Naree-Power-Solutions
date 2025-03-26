'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  let errorMessage = 'An error occurred during authentication.'
  
  if (error === 'OAuthSignin') errorMessage = 'Error starting the sign in process.'
  if (error === 'OAuthCallback') errorMessage = 'Error processing the callback from Google.'
  if (error === 'OAuthAccountNotLinked') errorMessage = 'This email is already associated with another provider.'
  if (error === 'EmailCreateAccount') errorMessage = 'Unable to create account.'
  if (error === 'Callback') errorMessage = 'Error during the OAuth callback.'
  if (error === 'AccessDenied') errorMessage = 'You do not have permission to sign in.'
  if (error === 'Configuration') errorMessage = 'There is a problem with the server configuration.'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Authentication Error</h2>
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/auth/signin"
            className="block w-full rounded-md bg-orange-500 px-4 py-2 text-center text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="mt-4 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
