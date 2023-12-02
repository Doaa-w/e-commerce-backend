import slugify from 'slugify';

import Product from '../models/product';
import { IProduct, ProductInput, ProductType } from '../types/product';

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

export const getSingleProduct = async (slug: any) => {
  const options = {
    updatedAt: 0,
    __v: 0
  }
  const product = await Product.findOne({ slug: slug }, options);
  if (!product) {
    throw new ApiError(404, 'Product not found!');
  }
  return product;
};

export const deleteProduct = async (slug: any) => {
  const deletedProduct = await Product.findOneAndDelete({ slug: slug });
  if (!deletedProduct) {
    throw new ApiError(404, 'Product not found!');
  }
};

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
  const productExists = await Product.findOne({ slug: originalSlug });
  if (!productExists) {
    throw new ApiError(404, 'Product not found!');
  }
  if (updateProductData.title && updateProductData.title !== productExists.title) {
    updateProductData.slug = slugify(updateProductData.title, {
      lower: true,
    });
  }
  const updatedProduct = await Product.findOneAndUpdate({ slug: originalSlug }, updateProductData, {
    new: true,
  });
  return updatedProduct;
};