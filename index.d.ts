declare namespace Express {
  interface Request {
    msg: string
    user: {
      id: string
      first_name: string
      last_name :string
      email :string
      password:string
      phone:string
      address :string
    }
  }
}
