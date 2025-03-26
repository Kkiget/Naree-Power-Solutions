'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function AuthStatus() {
  const { data: session, status } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  if (status === 'loading') {
    return <div className="h-9 w-20 animate-pulse rounded bg-gray-200"></div>
  }

  if (status === 'unauthenticated') {
    return (
      <Link
        href="/auth/signin"
        className="flex items-center rounded-sm border border-transparent px-3 py-1 text-sm text-white hover:border-white"
      >
        <div>
          <div className="text-xs text-gray-300">Hello, Sign In</div>
          <div className="font-bold">Account & Lists</div>
        </div>
      </Link>
    )
  }

  // User is authenticated
  const name = session?.user?.name || session?.user?.email?.split('@')[0] || 'User'
  
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center rounded-sm border border-transparent px-3 py-1 text-sm text-white hover:border-white"
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
      >
        <div>
          <div className="text-xs text-gray-300">Hello, {name}</div>
          <div className="font-bold">Account & Lists</div>
        </div>
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 top-full z-50 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="divide-y divide-gray-100">
            <div className="p-4">
              <div className="mb-3 text-center">
                <Link
                  href="/account"
                  className="block w-full rounded-md bg-orange-500 py-2 px-4 text-center text-sm font-medium text-white hover:bg-orange-600"
                >
                  Your Account
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/shop" className="text-sm hover:text-orange-500">
                  Shop
                </Link>
                <Link href="/orders" className="text-sm hover:text-orange-500">
                  Orders
                </Link>
                <Link href="/wishlist" className="text-sm hover:text-orange-500">
                  Wishlist
                </Link>
                <Link href="/returns" className="text-sm hover:text-orange-500">
                  Returns
                </Link>
              </div>
            </div>
            <div className="p-3">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full text-left text-sm text-gray-700 hover:text-orange-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
