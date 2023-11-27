import slugify from 'slugify'
import { Request, Response, NextFunction } from 'express'
import Product from '../models/product'
import { ProductInput, ProductType } from '../types'
import { createHttpError } from '../util/createHttpError'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const totalCount = await Product.countDocuments()
    const totalPages = Math.ceil(totalCount / limit)
    if (page > totalPages) {
      page = totalPages > 0 ? totalPages : 1
    }

    const skip = (page - 1) * limit
    const products = await Product.find().skip(skip).limit(limit)

    if (page > totalCount) {
    }

    res.status(200).json({
      message: 'Returns all products',
      payload: products,
      page,
      limit,
      totalCount,
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleProductsBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug
    const product = await Product.findOne({ slug: slug })
    if (!product) {
      const error = createHttpError(404, 'Product not found!')
      throw error
    }
    console.log(product)

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
    const deletedProduct = await Product.findOneAndDelete({ slug: slug })

    if (!deletedProduct) {
      const error = createHttpError(404, 'Product not found!')
      throw error
    }
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
    const newProduct = req.body
    const productExist = await Product.exists({ title: newProduct.title })
    if (!productExist) {
      newProduct.slug = slugify(newProduct.title, { lower: true })
      const product = new Product(newProduct)
      await product.save()
      res.status(201).json({
        message: 'Product created',
        payload: product,
      })
    }
    const error = createHttpError(409, 'Product already exists')
    throw error
  } catch (error) {
    console.error(error)
    next(error)
  }
}
export const updateSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const originalSlug = req.params.slug
    const { title } = req.body
    const updateProductData = req.body

    const productExists = await Product.findOne({ slug: originalSlug })

    if (!productExists) {
      const error = createHttpError(404, 'Product not found!')
      throw error
    }

    if (title && title !== productExists.title) {
      updateProductData.slug = slugify(title, { lower: true })
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: originalSlug },
      updateProductData,
      { new: true }
    )

    res.status(201).json({
      message: 'Product updated successfully',
      payload: updatedProduct,
    })
  } catch (error) {
    next(error)
  }
}
