
export type category ={
    id: string,
    name: string,
    // slug: string,
}

export type categoryInput= Omit<category,'id '>;