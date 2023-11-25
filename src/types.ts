
export type category ={
    _id: string,
    name: string,
    // slug: string,
}

export type categoryInput= Omit<category,'_id '>;