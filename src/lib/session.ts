import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export interface Session {
  _id: ObjectId;
  userId: ObjectId;
  token: string;
  userAgent: string;
  ip: string;
  location?: string;
  lastActive: Date;
  createdAt: Date;
}

export async function createSession(data: Omit<Session, '_id' | 'createdAt' | 'lastActive'>) {
  const client = await clientPromise;
  const sessions = client.db().collection('sessions');

  const session = await sessions.insertOne({
    ...data,
    lastActive: new Date(),
    createdAt: new Date(),
  });

  return session;
}

export async function updateSessionActivity(sessionId: string) {
  const client = await clientPromise;
  const sessions = client.db().collection('sessions');

  await sessions.updateOne(
    { _id: new ObjectId(sessionId) },
    { $set: { lastActive: new Date() } }
  );
}

export async function getUserSessions(userId: string) {
  const client = await clientPromise;
  const sessions = client.db().collection('sessions');

  return sessions.find({
    userId: new ObjectId(userId),
  }).sort({ lastActive: -1 }).toArray();
}

export async function deleteSession(sessionId: string) {
  const client = await clientPromise;
  const sessions = client.db().collection('sessions');

  await sessions.deleteOne({ _id: new ObjectId(sessionId) });
}

export async function deleteAllUserSessions(userId: string, exceptSessionId?: string) {
  const client = await clientPromise;
  const sessions = client.db().collection('sessions');

  const query = { userId: new ObjectId(userId) };
  if (exceptSessionId) {
    Object.assign(query, { _id: { $ne: new ObjectId(exceptSessionId) } });
  }

  await sessions.deleteMany(query);
}
