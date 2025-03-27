import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { withRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

export async function PUT(req: Request) {
  try {
    // Check rate limit
    const rateLimitResult = await withRateLimit(req);
    if (rateLimitResult) return rateLimitResult;

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = profileSchema.parse(body);

    const client = await clientPromise;
    const users = client.db().collection('users');

    // Check if email is taken by another user
    if (validatedData.email !== session.user.email) {
      const existingUser = await users.findOne({ email: validatedData.email });
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email already taken' },
          { status: 400 }
        );
      }
    }

    // Update user
    await users.updateOne(
      { email: session.user.email },
      {
        $set: {
          name: validatedData.name,
          email: validatedData.email,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json(
      { message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { message: 'Error updating profile' },
      { status: 500 }
    );
  }
}
