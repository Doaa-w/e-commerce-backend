import { Document } from 'mongoose'


import { UserType } from '../types/user'
import { IProduct } from '../types/product'

export interface IOrder extends Document {
    _id: string;
    user: UserType['_id'];
    products: IProduct['slug'][];
    createdAt?: Date;
    updatedAt?: Date;
    __v: number;
}