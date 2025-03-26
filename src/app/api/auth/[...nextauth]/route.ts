import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { connectToDatabase as connectToDB } from '@/lib/db'
import { ExtendedUser } from '@/types/auth'

export const authOptions = {
  adapter: MongoDBAdapter(async () => {
    const db = await connectToDB()
    return db.client
  }),
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Record<string, unknown>) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        try {
          const db = await connectToDB()
          const user = await db
            .collection('users')
            .findOne({ email: credentials.email as string })

          if (!user) {
            // Create detailed user profile for kimkiget@gmail.com
            const isTestUser = credentials.email === 'kimkiget@gmail.com'
            const emailParts = (credentials.email as string).split('@')
            const username = emailParts[0]
            const domain = emailParts[1]

            const profile: ExtendedUser['profile'] = isTestUser ? {
              name: "Kim Kiget",
              userId: "UK123456789",
              address: {
                billing: {
                  fullName: "Kim Kiget",
                  street: "123 Main Street",
                  city: "Los Angeles",
                  state: "CA",
                  zip: "90001",
                  country: "USA",
                  phone: "+1 213-555-0123"
                },
                shipping: {
                  fullName: "Kim Kiget",
                  street: "123 Main Street",
                  city: "Los Angeles",
                  state: "CA",
                  zip: "90001",
                  country: "USA",
                  phone: "+1 213-555-0123",
                  instructions: "Leave package at front door"
                }
              },
              paymentMethods: [
                {
                  type: "credit_card",
                  last4: "4242",
                  brand: "Visa",
                  expiry: "12/26",
                  default: true
                }
              ],
              preferences: {
                language: "en",
                currency: "USD",
                newsletter: true,
                marketing: true
              },
              security: {
                twoFactorEnabled: false,
                lastPasswordChange: new Date().toISOString(),
                securityQuestions: [
                  {
                    question: "What is your favorite color?",
                    answer: "blue"
                  }
                ]
              }
            } : {
              name: username,
              userId: `USER${Math.floor(Math.random() * 1000000)}`,
              address: {
                billing: {
                  fullName: username,
                  street: "123 Test Street",
                  city: "Test City",
                  state: "TS",
                  zip: "12345",
                  country: "Testland",
                  phone: "+1 555-0123"
                },
                shipping: {
                  fullName: username,
                  street: "123 Test Street",
                  city: "Test City",
                  state: "TS",
                  zip: "12345",
                  country: "Testland",
                  phone: "+1 555-0123"
                }
              },
              paymentMethods: [
                {
                  type: "credit_card",
                  last4: "4242",
                  brand: "Test Card",
                  expiry: "12/26",
                  default: true
                }
              ],
              preferences: {
                language: "en",
                currency: "USD",
                newsletter: true,
                marketing: true
              },
              security: {
                twoFactorEnabled: false,
                lastPasswordChange: new Date().toISOString(),
                securityQuestions: []
              }
            }

            const newUser = await db.collection('users').insertOne({
              email: credentials.email as string,
              password: credentials.password as string,
              createdAt: new Date(),
              profile: profile
            })

            return {
              id: newUser.insertedId.toString(),
              email: credentials.email as string,
              profile: profile
            }
          } else {
            if (user.password !== credentials.password) {
              throw new Error('Invalid password')
            }

            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              profile: {
                name: user.name,
                userId: user._id.toString(),
                address: {
                  billing: user.address?.billing || {
                    fullName: user.name,
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: '',
                    phone: ''
                  },
                  shipping: user.address?.shipping || {
                    fullName: user.name,
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: '',
                    phone: '',
                    instructions: ''
                  }
                },
                paymentMethods: user.paymentMethods || [],
                preferences: user.preferences || {
                  language: 'en',
                  currency: 'USD',
                  newsletter: false,
                  marketing: false
                },
                security: user.security || {
                  twoFactorEnabled: false,
                  lastPasswordChange: new Date().toISOString(),
                  securityQuestions: []
                }
              }
            }
          }
        } catch (error) {
          console.error('Authorization error:', error)
          throw new Error('Invalid credentials')
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.profile = user.profile
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.profile = token.profile as ExtendedUser['profile']
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
