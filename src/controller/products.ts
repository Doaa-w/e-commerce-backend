import { Request, Response, NextFunction } from 'express'
import {
  creatProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from '../services/productService'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = typeof req.query.page === 'string' ? req.query.page : '1'
    const limit = typeof req.query.limit === 'string' ? req.query.limit : '10'

    const result = await getProducts(page, limit)

    res.status(200).json({
      message: 'Returns all products',
      // payload: result.products,
      ...result,
    })
  } catch (error) {
    next(error)
  }
}
export const getSingleProductsBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug
    const product = await getSingleProduct(slug)
    console.log(slug)

    res.status(200).json({
      message: 'Product found',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}
export const deleteSingleProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug
    const deletedProduct = await deleteProduct(slug)

    res.status(201).json({
      message: 'Product deleted',
      payload: deletedProduct,
    })
  } catch (error) {
    next(error)
  }
}
export const createSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = req.body
    const product = await creatProduct(newProduct)
    res.status(201).json({
      message: 'Product created',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}
export const updateSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const originalSlug = req.params.slug
    const updateProductData = req.body

    const updatedProduct = await updateProduct(originalSlug, updateProductData)

    res.status(201).json({
      message: 'Product updated successfully',
      payload: updatedProduct,
    })
  } catch (error) {
    next(error)
  }
}