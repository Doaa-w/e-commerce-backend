import slugify from 'slugify'
import Product from '../models/product'
import { ProductInput, ProductType } from '../types'
import { createHttpError } from '../util/createHttpError'
import ApiError from '../errors/ApiError'
// import { createHttpError } from '../util/createHttpError'
export const getProducts = async (pageParam: string, limitParam: string) => {
  let page = Number(pageParam) || 1
  const limit = Number(limitParam) || 10
  const totalCount = await Product.countDocuments()
  const totalPages = Math.ceil(totalCount / limit)

  if (page > totalPages) {
    page = totalPages > 0 ? totalPages : 1
  }

  const skip = (page - 1) * limit
  const payload = await Product.find().skip(skip).limit(limit)

  return {
    payload,
    page,
    limit,
    totalCount,
  }
}
export const getSingleProduct = async (slug: any) => {
  const product = await Product.findOne({ slug: slug })
  if (!product) {
    throw new ApiError(404, 'Product not found!')
  }
  return product
}
export const deleteProduct = async (slug: any) => {
  const deletedProduct = await Product.findOneAndDelete({ slug: slug })
  if (!deletedProduct) {
    throw new ApiError(404, 'Product not found!')
  }
  return deletedProduct
}
export const creatProduct = async (productInput: ProductInput) => {
  const productExist = await Product.exists({ title: productInput.title })
  if (productExist) {
    throw new ApiError(404, 'Product already exists')
  }

  productInput.slug = slugify(productInput.title, { lower: true })
  const product = new Product(productInput)
  await product.save()

  return product
}
export const updateProduct = async (originalSlug: any, updateProductData: ProductType) => {
  const productExists = await Product.findOne({ slug: originalSlug })
  if (!productExists) {
    throw new ApiError(404, 'Product not found!')
  }

  if (updateProductData.title && updateProductData.title !== productExists.title) {
    updateProductData.slug = slugify(updateProductData.title, {
      lower: true,
    })
  }

  const updatedProduct = await Product.findOneAndUpdate({ slug: originalSlug }, updateProductData, {
    new: true,
  })

  return updatedProduct
}
