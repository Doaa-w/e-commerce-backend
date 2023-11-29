export type UserType = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  order?: OrderDocument[];
  isAdmin?: boolean;
  isBanned?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderDocument = Document & {
  name: string;
  products: ProductType[];
  slug: string;
  user: string; // Reference to User model using slug
};

export type EmailDataType = {
  email: string;
  subject: string;
  html: string;
}

export type categoryI = {
  _id: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CategoryInput = Omit<categoryI, '_id'>;

export type ProductType = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  shipping?: number;
  category: ICategory['_id'];
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductInput = Omit<ProductType, '_id'>;

export interface ICategory extends Document {
  _id: string;
  title: string;
  slug: string;
}
export interface IProduct extends Document {
  save: any;
  title: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  sold: number;
  shipping?: number;
  category: ICategory['_id'];
  description: string;
  createAt?: string;
  updatedAt?: string;
}

export interface Error {
  status?: number;
  message?: string;
};