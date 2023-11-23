import {Request,Response , NextFunction } from "express";
import slugify from "slugify";
import { category } from "../models/category";
import { categoryInput } from "../types";



export const getAllCategories =  async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const categories = await category.find() 
        console.log('category:')
        res.status(200).json({message: 'all categories are here' , payload: categories})  
        console.log(categories)
    } catch (error) {
        next(error)
    }
}


export const getSinglrCategory =  async (req: Request , res: Response , next:NextFunction )=>{
try {
    const slug =req.params.slug
    const singleCategory = await category.findOne({slug: slug})
    res.status(200).json({
        message: "single category is returned" ,
        payload: singleCategory
    })
} catch (error) {
   next(error) 
}
}

export const createCtegory =  async (req: Request , res: Response , next:NextFunction)=>{
  try {
    const {name}: categoryInput =req.body
    console.log(req.body)
    const exsistCategory= await category.exists({name: name})
    if(exsistCategory){
        res.json({message: "category already exists"})
    }
    const newCategory=new category({
        name,
        slug:slugify(name)
    })
    await newCategory.save()
    res.status(201).json({
        message: "added new category",
        payload: newCategory
    })
  } catch (error) {
    next(error)
  }  
}

export const deleteCategory =  async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const id = req.params.id
      await category.findByIdAndDelete(id)  
      res.status(200).json({
        message: "category is deleted"
      })

    } catch (error) {
        next(error)
    }
}

export const updateCategory =  async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const id=req.params.id
      const updateCategory: categoryInput =req.body
      const updatedCategory =await category.findByIdAndUpdate(id, updateCategory ,{new: true})  
      if(!updatedCategory){
        res.status(400).json({
            message: "catrgory does not exsist "
        })
        res.status(200).json({
            message: "the category is updated"
        })
    }  
    } catch (error) {
      next(error)  
    }
}