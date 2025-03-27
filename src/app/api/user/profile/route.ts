import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/auth';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = profileSchema.parse(body);

    const client = await clientPromise;
    const users = client.db().collection('users');

    // Check if email is already taken by another user
    if (validatedData.email !== session.user.email) {
      const existingUser = await users.findOne({
        email: validatedData.email,
        _id: { $ne: new ObjectId(session.user.id) }
      });
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email already taken' },
          { status: 400 }
        );
      }
    }

    // Update user
    await users.updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          name: validatedData.name,
          email: validatedData.email,
          updatedAt: new Date(),
        }
      }
    );

    return NextResponse.json(
      { message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile update error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Error updating profile' },
      { status: 500 }
    );
  }
}
