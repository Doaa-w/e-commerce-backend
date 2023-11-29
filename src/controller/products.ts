import { Request, Response, NextFunction } from 'express'
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from '../services/productService'
import { IProduct } from '../types'
import Product from '../models/product'
import slugify from 'slugify'
import ApiError from '../errors/ApiError'
import { createHttpError } from '../util/createHttpError'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = typeof req.query.page === 'string' ? req.query.page : '1'
    const limit = typeof req.query.limit === 'string' ? req.query.limit : '10'
    const search = (req.query.search as string) || ''

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

    res.status(204).json({
      message: 'Product deleted',
      payload: deletedProduct,
    })
  } catch (error) {
    next(error)
  }
}
export const createSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productInput = {
      title: req.body.title,
      slug: slugify(req.body.title),
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      quantity: req.body.quantity,
      sold: req.body.sold,
      shipping: req.body.shipping,
      image: req.file?.path || 'default-image-path',
    }

    const product = await createProduct(productInput)
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
