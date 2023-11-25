
export type category ={
    _id: string,
    name: string,
    // slug: string,
    createdAt?: NativeDate,
    updatedAt?: NativeDate
}

export type categoryInput= Omit<category,'_id '>;