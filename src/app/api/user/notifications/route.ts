import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { withRateLimit } from '@/lib/rate-limit';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';

const notificationSchema = z.object({
  emailOnLogin: z.boolean(),
  emailOnPasswordChange: z.boolean(),
  emailOnProfileUpdate: z.boolean(),
});

export async function GET(req: Request) {
  try {
    const rateLimitResult = await withRateLimit(req);
    if (rateLimitResult) return rateLimitResult;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const users = client.db().collection('users');
    const user = await users.findOne({ _id: new ObjectId(session.user.id) });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      emailOnLogin: user.emailOnLogin ?? true,
      emailOnPasswordChange: user.emailOnPasswordChange ?? true,
      emailOnProfileUpdate: user.emailOnProfileUpdate ?? true,
    });
  } catch (error) {
    console.error('Get notification settings error:', error);
    return NextResponse.json(
      { message: 'Error fetching notification settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const rateLimitResult = await withRateLimit(req);
    if (rateLimitResult) return rateLimitResult;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = notificationSchema.parse(body);

    const client = await clientPromise;
    const users = client.db().collection('users');

    await users.updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          emailOnLogin: validatedData.emailOnLogin,
          emailOnPasswordChange: validatedData.emailOnPasswordChange,
          emailOnProfileUpdate: validatedData.emailOnProfileUpdate,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json(
      { message: 'Notification settings updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update notification settings error:', error);
    return NextResponse.json(
      { message: 'Error updating notification settings' },
      { status: 500 }
    );
  }
}
