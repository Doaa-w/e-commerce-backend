import { Document } from "mongoose";

export type UserType = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    address?: string;
    isAdmin?: boolean;
    isBanned?: boolean;
    createdAt?: NativeDate;
    updatedAt?: NativeDate;
}

export interface categoryI extends Document {
  _id: string,
  name: string,
  slug: string,
  createdAt?: Date,
  updatedAt?: Date
}
export type Product = {
  name: string
  description: string
  quantity: number
}

export type productInput = Omit<Product, 'id'>
