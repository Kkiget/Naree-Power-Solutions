import { MongoClient } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: unknown | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return cachedDb
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined')
  }

  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    cachedClient = client
    cachedDb = client.db()
    return cachedDb
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}
