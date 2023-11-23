export type Product = {
  name: string
  description: string
  quantity: number
}

export type productInput = Omit<Product, 'id'>
