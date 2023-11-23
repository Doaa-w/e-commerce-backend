import { Request, Response, NextFunction } from 'express'
import product from '../models/product'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await product.find()
    res.status(200).json({ message: 'All products are here', payload: products })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, quantity } = req.body
    const c_product = new product({
      name,
      description,
      quantity,
    })
    await c_product.save()
    console.log(c_product)

    res.status(201).json({ message: 'Product created successfully', payload: c_product })
  } catch (error) {
    next(error)
  }
}

