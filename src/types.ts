export type user = {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    isAdmin: Boolean,
    isBanned: Boolean,
}
export type category ={
    _id: string,
    name: string,
    // slug: string,
    createdAt?: NativeDate,
    updatedAt?: NativeDate
}

export type categoryInput= Omit<category,'_id '>;