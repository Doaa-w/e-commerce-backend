import {Request,Response , NextFunction } from "express";

import { createTheCategory, deleteTheCategory, getAllTheCategory, getTheCategory, updateTheCategory } from "../services/categoryService";



export const getAllCategories =  async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const categories = await getAllTheCategory() 
        res.status(200).json({message: 'all categories are here' , payload: categories})  
        console.log(categories)
    } catch (error) {
        next(error)
    }
}


export const getSinglrCategory =  async (req: Request , res: Response , next:NextFunction )=>{
try {
    const {slug} =req.params
    const singleCategory = await getTheCategory(slug)
    if(!singleCategory){
      res.status(404).json({message: "category with this slug does not exists"})
    }
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
    const { name } = req.body
    console.log(req.body)
    const singleCategory= await createTheCategory(name)
    res.status(201).json({
      message: " category is created" ,
      payload: singleCategory
  })
  } catch (error) {
    next(error)
  }  
}

export const deleteCategory =  async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const {slug} = req.params
      const deletedCategory = await deleteTheCategory(slug) 
      res.status(204).json({
        message: "category is deleted",
        payload: deletedCategory
      })

    } catch (error) {
        next(error)
    }
}

export const updateCategory =  async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const {name}= req.body
      const {slug} =req.params
      const {updatedCategory}= await updateTheCategory(slug , name)
     await updatedCategory?.save()
        res.status(200).json({
            message: "the category is updated",
            payload:updatedCategory
        })
     
    } catch (error) {
      next(error)  
    }
  }
