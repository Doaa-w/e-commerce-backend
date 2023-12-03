import { Request, Response, NextFunction } from 'express'
import slugify from 'slugify'

import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from '../services/productService'
import Product from '../models/productSchema'
import { dev } from '../config'
import ApiError from '../errors/ApiError'
import { createHttpError } from '../util/createHttpError'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const search = req.query.search as string
    const result = await getProducts(page, limit, search)
    res.status(200).json({
      message: 'Returns all products',
      // payload: result.products,
      ...result,
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const product = await getSingleProduct(id)
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
    await deleteProduct(slug)
    res.status(204).json()
  } catch (error) {
    next(error)
  }
}

export const createSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, price, description, quantity, category, sold, shipping } = req.body
    const imagePath = req.file?.path
    const productInput = {
      title,
      slug: slugify(title),
      price,
      image: imagePath || dev.app.defaultProductImage,
      description,
      quantity,
      category,
      sold,
      shipping,
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
    let updateProductData = req.body

    if (req.file) {
      updateProductData.image = `/images/products/${req.file.filename}`
    }

    const updatedProduct = await updateProduct(originalSlug, updateProductData)
    res.status(200).json({
      message: 'Product updated successfully',
      payload: updatedProduct,
    })
  } catch (error) {
    next(error)
  }
}

// filter part:
export const getFilteredProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, priceRangeMin, priceRangeMax } = req.query
    const filter: any = {}
    if (category) {
      filter.category = category
    }
    if (priceRangeMin && priceRangeMax) {
      filter.price = { $gte: Number(priceRangeMin), $lte: Number(priceRangeMax) }
    }
    const products = await Product.find(filter)
    res.status(200).json({
      message: 'Returns filtered products',
      payload: products,
    })
  } catch (error) {
    next(error)
  }
}
