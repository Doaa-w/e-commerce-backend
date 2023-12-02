import { ProductType } from "./product";

export type OrderDocument = Document & {
    name: string;
    products: ProductType[];
    slug: string;
    user: string; // Reference to User model using slug
};