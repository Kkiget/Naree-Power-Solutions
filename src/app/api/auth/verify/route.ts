import { NextResponse } from 'next/server';
import { withRateLimit } from '@/lib/rate-limit';
import clientPromise from '@/lib/mongodb';
import { z } from 'zod';

const verifySchema = z.object({
  token: z.string(),
});

export async function POST(req: Request) {
  try {
    // Check rate limit
    const rateLimitResult = await withRateLimit(req, { interval: 300, limit: 10 });
    if (rateLimitResult) return rateLimitResult;

    const body = await req.json();
    const { token } = verifySchema.parse(body);

    const client = await clientPromise;
    const users = client.db().collection('users');

    // Find user by verification token
    const user = await users.findOne({
      verificationToken: token,
      verificationExpiry: { $gt: new Date() },
      emailVerified: false,
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Update user
    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          emailVerified: true,
          verificationToken: null,
          verificationExpiry: null,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Error verifying email' },
      { status: 500 }
    );
  }
}
