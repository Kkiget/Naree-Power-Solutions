import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { z } from 'zod';
import crypto from 'crypto';

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    const client = await clientPromise;
    const users = client.db().collection('users');
    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists with this email, you will receive password reset instructions.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await users.updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        },
      }
    );

    // TODO: Send email with reset link
    // For now, just return success
    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive password reset instructions.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
