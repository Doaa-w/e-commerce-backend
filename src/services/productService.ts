import slugify from 'slugify'
import Product from '../models/product'
import { IProduct, ProductInput, ProductType } from '../types'
import ApiError from '../errors/ApiError'
// import { createHttpError } from '../util/createHttpError'
export const getProducts = async (pageParam: string, limitParam: string , search='') => {
  let page = Number(pageParam) || 1
  const limit = Number(limitParam) || 10
  const totalCount = await Product.countDocuments()
  const totalPages = Math.ceil(totalCount / limit)
  const searchRegExp = new RegExp ('.*' + search + '.*','i')
   const filter={
     $or:[
       {title: {$regex:searchRegExp }}
        ]   
      }
      console.log('you' ,search)
  if (page > totalPages) {
    page = totalPages > 0 ? totalPages : 1
  }
  
  const skip = (page - 1) * limit
  const payload = await Product.find().populate('category').skip(skip).limit(limit)

  return {
    payload,
    page,
    limit,
    totalCount,
  }
}
export const getSingleProduct = async (slug: any): Promise<IProduct> => {
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
export const createProduct = async (productInput: ProductInput): Promise<IProduct> => {
  const { title, price, description, category, quantity, sold, shipping, image } = productInput

  const productExist = await Product.exists({ title: title })
  if (productExist) {
    throw new ApiError(404, 'Product already exists')
  }

  const newProduct = new Product({
    title: title,
    slug: slugify(title),
    price: price,
    image: image,
    description: description,
    quantity: quantity,
    category: category,
    sold: sold,
    shipping: shipping,
  })

  return newProduct.save()
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
