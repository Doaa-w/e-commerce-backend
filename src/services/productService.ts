import slugify from 'slugify';
import fs from 'fs'
import path from 'path'

import Product from '../models/productSchema';
import { IProduct, ProductInput, ProductType } from '../types/productType';

import ApiError from '../errors/ApiError';
// import { createHttpError } from '../util/createHttpError';

export const getProducts = async (pageParam = 1, limitParam = 10, search = '') => {
  const totalCount = await Product.countDocuments();
  const totalPages = Math.ceil(totalCount / limitParam);
  const searchRegExp = new RegExp ('.*' + search + '.*', 'i');
  const filter = {
    $or:[
      {title: {$regex: searchRegExp }},
      {description: {$regex: searchRegExp}}
    ]
  };
  const options = {
    updatedAt: 0,
    __v: 0
  }
  if (pageParam < totalPages) {
    pageParam = totalPages;
  }
  const skip = (pageParam - 1) * limitParam;
  const payload = await Product.find(filter, options).populate('category').sort({title: 1}).skip(skip).limit(limitParam);
  return {
    payload,
    totalPages,
    CuurentPage: pageParam,
  }
};

export const getSingleProduct = async (id: string) => {
  const options = {
    updatedAt: 0,
    __v: 0,
  }
  const product = await Product.findById(id, options).populate('category')
  if (!product) {
    throw new ApiError(404, 'Product not found!')
  }
  return product
}



export const deleteProduct = async (slug: string) => {
  const product = await Product.findOne({ slug: slug })
  if (!product) {
    throw new ApiError(404, 'Product not found!')
  }
//! Error here fix it later 
  if (product.image) {
    const imagePath = path.join(
      __dirname,
      'public',
      'images',
      'products',
      product.image
    )

    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Failed to delete the image file:', err)
        }
      })
    } else {
      console.log('No file found to delete at:', imagePath)
    }
  }


  await Product.findByIdAndDelete(product._id)
}



export const createProduct = async (productInput: ProductInput): Promise<IProduct> => {
  const { title, price, image, description, quantity, category, sold, shipping } = productInput;
  const productExist = await Product.exists({ title: title });
  if (productExist) {
    throw new ApiError(404, 'Product already exists');
  }
  const newProduct = new Product({
    title,
    slug: slugify(title),
    price,
    image,
    description,
    quantity,
    category,
    sold,
    shipping,
  });
  return newProduct.save();
};

export const updateProduct = async (originalSlug: any, updateProductData: ProductType) => {
  const productExists = await Product.findOne({ slug: originalSlug })
  if (!productExists) {
    throw new ApiError(404, 'Product not found!')
  }
  if (updateProductData.image) {
    productExists.image = updateProductData.image
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