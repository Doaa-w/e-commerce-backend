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
  createdAt?: Date;
  updatedAt?: Date;
}

export type EmailDataType = {
  email: string;
  subject: string;
  html: string;
}

export type categoryI ={
  _id: string,
  name: string,
  slug: string,
  createdAt?: Date,
  updatedAt?: Date
}

export type CategoryInput = Omit<categoryI, '_id'>

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
export interface ICategory extends Document {
  _id: string
  title: string
  slug: string
}
export interface IProduct extends Document {
  title: string
  slug: string
  price: number
  quantity: number
  sold: number
  shipping: number
  category: ICategory['_id']
  description: string
  createAt?: string
  updatedAt?: string
}