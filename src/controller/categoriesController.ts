import { Request, Response, NextFunction } from "express";

import { createTheCategory, deleteTheCategory, getAllTheCategory, getTheCategory, updateTheCategory } from "../services/categoryService";

export const getAllCategories =  async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const search = req.query.search as string;
      const categories = await getAllTheCategory(search);
      res.status(200).json({message: 'all categories are here' , payload: categories});
    } catch (error) {
        next(error);
    }
};

export const getSinglrCategory = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const {slug} = req.params;
    const singleCategory = await getTheCategory(slug);
    res.status(200).json({
      message: "single category is returned",
      payload: singleCategory
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = req.body;
    const singleCategory= await createTheCategory(newCategory);
    res.status(201).json({
      message: "category is created",
      payload: singleCategory
    });
  } catch (error) {
    next(error);
  }  
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug;
    await deleteTheCategory(slug);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const updateCategory =  async (req: Request , res: Response , next:NextFunction)=>{
  try {
    const slug =req.params.slug;
    const updateCategoryData= req.body;
    const updatedCategory= await updateTheCategory(slug , updateCategoryData);
    res.status(200).json({
      message: "the category is updated",
      payload: updatedCategory
    });
  } catch (error) {
    next(error);  
  }
};