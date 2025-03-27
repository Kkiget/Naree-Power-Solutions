import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/validation';
import { withRateLimit } from '@/lib/rate-limit';
import clientPromise from '@/lib/mongodb';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Check rate limit
    const rateLimitResult = await withRateLimit(req, { interval: 3600, limit: 5 });
    if (rateLimitResult) return rateLimitResult;

    const body = await req.json();
    const validatedData = registerSchema.parse(body);
    
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // Check if user exists
    const existingUser = await users.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await users.insertOne({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      role: 'user',
      emailVerified: false,
      verificationToken,
      verificationExpiry,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${verificationToken}`;
    
    await resend.emails.send({
      from: 'Naree Power Solutions <no-reply@nareepowersolutions.com>',
      to: validatedData.email,
      subject: 'Verify your email address',
      html: `
        <h1>Welcome to Naree Power Solutions!</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    return NextResponse.json(
      { 
        message: 'Registration successful. Please check your email to verify your account.',
        userId: user.insertedId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
}
