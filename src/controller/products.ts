import { Request, Response, NextFunction } from 'express'
import Product from '../models/product'
import slugify from 'slugify'

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
    // send a status code to Error
    if (!product) {
      throw new Error('Product not found!')
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
      throw new Error('Product not found!')
    }

    res.json({
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
    if (productExist) {
      return res.status(400).json({ message: 'Product already exists' })
    }
    newProduct.slug = slugify(newProduct.title, { lower: true })
    const product = new Product(newProduct)
    await product.save()
    res.json({
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
    const { title } = req.body
    const updateProductData = req.body


    const productExists = await Product.findOne({ slug: originalSlug })
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found!' })
    }


    if (title && title !== productExists.title) {
      updateProductData.slug = slugify(title, { lower: true })
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: originalSlug },
      updateProductData,
      { new: true } 
    )

    res.json({
      message: 'Product updated successfully',
      payload: updatedProduct,
    })
  } catch (error) {
    next(error)
  }
}
