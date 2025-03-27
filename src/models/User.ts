import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  image?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithoutPassword extends Omit<User, 'password'> {}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  image?: string;
  role?: string;
}
