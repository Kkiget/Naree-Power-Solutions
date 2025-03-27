import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserSessions, deleteSession, deleteAllUserSessions } from '@/lib/session';
import { withRateLimit } from '@/lib/rate-limit';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  try {
    const rateLimitResult = await withRateLimit(req);
    if (rateLimitResult) return rateLimitResult;

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sessions = await getUserSessions(session.user.id);

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Get sessions error:', error);
    return NextResponse.json(
      { message: 'Error fetching sessions' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const rateLimitResult = await withRateLimit(req);
    if (rateLimitResult) return rateLimitResult;

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (sessionId) {
      await deleteSession(sessionId);
      return NextResponse.json(
        { message: 'Session terminated successfully' }
      );
    } else {
      await deleteAllUserSessions(session.user.id, session.id);
      return NextResponse.json(
        { message: 'All other sessions terminated successfully' }
      );
    }
  } catch (error) {
    console.error('Delete sessions error:', error);
    return NextResponse.json(
      { message: 'Error managing sessions' },
      { status: 500 }
    );
  }
}
