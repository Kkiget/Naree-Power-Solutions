import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const client = new MongoClient(uri, options);
const clientPromise = globalWithMongo._mongoClientPromise || client.connect();

if (process.env.NODE_ENV !== 'production') {
  globalWithMongo._mongoClientPromise = clientPromise;
}

export default clientPromise;
