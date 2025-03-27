import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Define public API routes
const publicApiRoutes = [
  '/api/auth/register',
  '/api/auth/verify',
  '/api/check-env',
]

// Define protected API routes
const protectedApiRoutes = [
  '/api/user',
  '/api/user/profile',
  '/api/user/password',
  '/api/user/notifications',
]

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isApiRoute = req.nextUrl.pathname.startsWith('/api')
    const isCheckoutPage = req.nextUrl.pathname.startsWith('/checkout')
    const isAccountPage = req.nextUrl.pathname === '/account'
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')

    // Handle authentication pages
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      return null
    }

    // Handle API routes
    if (isApiRoute) {
      const isPublicApi = publicApiRoutes.some(route => 
        req.nextUrl.pathname.startsWith(route)
      )
      const isProtectedApi = protectedApiRoutes.some(route => 
        req.nextUrl.pathname.startsWith(route)
      )

      if (isProtectedApi && !isAuth) {
        return new NextResponse(
          JSON.stringify({ error: 'Authentication required' }),
          { status: 401, headers: { 'content-type': 'application/json' } }
        )
      }

      if (isPublicApi) {
        return null
      }
    }

    // Handle /account redirect
    if (isAccountPage) {
      return NextResponse.redirect(new URL('/dashboard/account', req.url))
    }

    // Handle protected pages
    if ((isDashboardPage || isCheckoutPage) && !isAuth) {
      const redirectUrl = new URL('/auth/login', req.url)
      redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return null
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

// Update the matcher configuration to include all relevant paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/api/:path*',
    '/account',
    '/checkout',
  ]
} 