import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { User } from "next-auth"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  secret: "hfkH8BuDoxubFCsaB8a3Bm5GlMOsfJBxa0r9EX+eVwg=",
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Demo login - in a real app this would check against a database
        const email = credentials?.email as string || ""
        const password = credentials?.password as string || ""
        
        if (email && password && password.length >= 8) {
          return {
            id: "1",
            name: email.split('@')[0],
            email: email,
            image: null
          } as User
        }
        
        return null
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin", // Redirect back to signin page with error
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `naree-session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    }
  },
})
