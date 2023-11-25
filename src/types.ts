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

export type UserInputType = Omit<UserType, '_id'>;

export type category ={
    _id: string,
    name: string,
    // slug: string,
    createdAt?: NativeDate,
    updatedAt?: NativeDate
}

export type categoryInput= Omit<category,'_id '>;