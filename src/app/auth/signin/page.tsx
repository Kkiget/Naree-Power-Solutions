'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const result = await signIn('credentials', {
        redirect: true,
        callbackUrl: '/shop',
        email,
        password,
      })

      // The redirect option above should handle this automatically
      // But just in case, we'll keep a backup
      if (result?.ok === false) {
        setError('Incorrect email or password')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Sign in error:', err)
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-10">
      <div className="mb-6 w-full max-w-xs text-center">
        <Link href="/">
          <Image 
            src="/images/NAREE POWER 3B.png" 
            alt="Naree Power Solutions Logo" 
            width={150} 
            height={50}
            className="mx-auto"
          />
        </Link>
      </div>
      
      <div className="w-full max-w-sm rounded-md border border-gray-300 bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link href="#" className="text-xs text-orange-600 hover:text-orange-500">
                Forgot your password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              required
              minLength={8}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded bg-orange-500 py-2 px-4 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-orange-300"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
      
      <div className="mt-4 w-full max-w-sm text-center">
        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-100 px-2 text-xs text-gray-500">New to Naree Power Solutions?</span>
          </div>
        </div>
        
        <Link
          href="#"
          className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Create your Naree Power Solutions account
        </Link>
      </div>
    </div>
  )
}
