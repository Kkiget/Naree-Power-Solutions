import { User } from 'next-auth'

export interface UserProfile {
  name: string
  userId: string
  address: {
    billing: {
      fullName: string
      street: string
      city: string
      state: string
      zip: string
      country: string
      phone: string
    }
    shipping: {
      fullName: string
      street: string
      city: string
      state: string
      zip: string
      country: string
      phone: string
      instructions?: string
    }
  }
  paymentMethods: Array<{
    type: string
    last4: string
    brand: string
    expiry: string
    default: boolean
  }>
  preferences: {
    language: string
    currency: string
    newsletter: boolean
    marketing: boolean
  }
  security: {
    twoFactorEnabled: boolean
    lastPasswordChange: string
    securityQuestions: Array<{
      question: string
      answer: string
    }>
  }
}

export interface Credentials {
  email: string
  password: string
}

export interface ExtendedUser extends User {
  profile: UserProfile
}
