import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { withRateLimit } from '@/lib/rate-limit';
import { passwordSchema } from '@/lib/validation';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const passwordUpdateSchema = z.object({
  currentPassword: z.string(),
  newPassword: passwordSchema,
});

export async function PUT(req: Request) {
  try {
    // Check rate limit (stricter for password changes)
    const rateLimitResult = await withRateLimit(req, { interval: 3600, limit: 5 });
    if (rateLimitResult) return rateLimitResult;

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = passwordUpdateSchema.parse(body);

    const client = await clientPromise;
    const users = client.db().collection('users');

    // Get user with current password
    const user = await users.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Verify current password
    const isValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    );

    if (!isValid) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 12);

    // Update password
    await users.updateOne(
      { email: session.user.email },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { message: 'Error updating password' },
      { status: 500 }
    );
  }
}
