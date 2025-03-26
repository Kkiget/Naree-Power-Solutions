import { NextResponse } from 'next/server'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

export async function GET() {
  console.log('Environment variables:', {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  })

  return NextResponse.json({
    env: {
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✓' : '✗',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? '✓' : '✗',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? '✓' : '✗',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '✓' : '✗'
    }
  })
}
