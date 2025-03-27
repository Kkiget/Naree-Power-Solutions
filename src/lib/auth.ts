import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'
import { z } from 'zod'

// Add Google profile type
interface GoogleProfile {
  email_verified: boolean;
  email: string;
  name: string;
  picture: string;
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null

        try {
          const { email, password } = credentialsSchema.parse(credentials)

          const client = await clientPromise
          const users = client.db().collection('users')
          const user = await users.findOne({ email })

          if (!user) return null

          const isValid = await bcrypt.compare(password, user.password)
          if (!isValid) return null

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || 'user',
            image: user.image,
          }
        } catch {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
      }
      return session
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return !!(profile as GoogleProfile)?.email_verified
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
} 