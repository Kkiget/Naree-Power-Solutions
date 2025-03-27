import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  image?: string;
  role?: string;
}

export default User;
