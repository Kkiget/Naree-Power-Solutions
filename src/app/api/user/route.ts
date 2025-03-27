import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { withRateLimit } from '@/lib/rate-limit';
import { ObjectId } from 'mongodb';

export async function DELETE(req: Request) {
  try {
    // Check rate limit
    const rateLimitResult = await withRateLimit(req, { interval: 86400, limit: 3 });
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

    // Delete user
    await users.deleteOne({ _id: new ObjectId(session.user.id) });

    return NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json(
      { message: 'Error deleting account' },
      { status: 500 }
    );
  }
}
