import slugify from "slugify";

import { category } from "../models/category";
import { CategoryInput } from "../types/category";
import ApiError from "../errors/ApiError";
import { Request } from "express";

export const getAllTheCategory = async (search = '') => {
  const searchRegExp = new RegExp ('.*' + search + '.*', 'i');
  const filter = {
    $or: [
      {name: {$regex: searchRegExp }}
    ]   
  };
  const options = {
    updatedAt: 0,
    __v: 0
  }
  const categories = await category.find(filter, options);
  if (!categories) {
    throw new ApiError(404, 'categories not found!');
  }
  return categories;
};

export const getTheCategory = async (slug: string) => {
  const options = {
    updatedAt: 0,
    __v: 0
  }
  const singleCategory = await category.findOne({ slug: slug }, options);
  if (!singleCategory) {
    throw new ApiError(404, 'category is not found!');
  }
  return singleCategory;
};

export const deleteTheCategory= async (slug: string) => {
  const deletedCategory = await category.findOneAndDelete({ slug: slug });
  if (!deletedCategory) {
    throw new ApiError(404, 'category is not found!');
  }
};

export const createTheCategory = async (categoryInput: CategoryInput) => {
  const exsistCategory= await category.exists({ name: categoryInput.name });
  if(exsistCategory){
    throw new ApiError(404, "category already exists");
  }
  categoryInput.slug = slugify(categoryInput.name, { lower: true });
  const newCategory = new category(categoryInput);
  await newCategory.save();
  return newCategory;
};

export const updateTheCategory = async (req: Request) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const singleCategory = await category.findOneAndUpdate({ slug: req.params.slug }, req.body, {new: true});
  if (!singleCategory) {
    throw new ApiError(404, 'category not found!');
  }
  return singleCategory;
};