import { IOrder } from "./orderType";

export type UserType = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    address?: string;
    order?: IOrder['_id'];
    isAdmin?: boolean;
    isBanned?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
  
export type UserInputType = Omit<UserType, '_id'>;

export interface IUser extends Document {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    address?: string;
    order?: IOrder['_id'];
    isAdmin?: boolean;
    isBanned?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type EmailDataType = {
    email: string;
    subject: string;
    html: string;
};

