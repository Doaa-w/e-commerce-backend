import { IOrder } from "./order";

export type UserType = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    address?: string;
    order?: IOrder;
    isAdmin?: boolean;
    isBanned?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
  
export type UserInputType = Omit<UserType, '_id'>;

export type EmailDataType = {
    email: string;
    subject: string;
    html: string;
}

