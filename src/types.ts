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

// export type Product = {
//   name: string
//   description: string
//   quantity: number
// }

// export type productInput = Omit<Product, 'id'>
export interface Error {
  status?: number
  message?: string
}
export type ProductType = {
  _id: string
  title: string
  slug: string
  description: string
  price: number
  quantity: number
  sold: number
  shipping: number
  createdAt?: NativeDate
  updatedAt?: NativeDate
}

export type ProductInput = Omit<ProductType, '_id'>