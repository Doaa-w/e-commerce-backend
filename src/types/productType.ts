import { ICategory } from "./categoryType";

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
};
  
export type ProductInput = Omit<ProductType, '_id'>;
  
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
};