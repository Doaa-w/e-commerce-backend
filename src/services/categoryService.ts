import slugify from "slugify"
import { category } from "../models/category"
import ApiError from "../errors/ApiError"
import { CategoryInput, categoryI } from "../types/category"

export const getAllTheCategory = async( search='' )=>{
    const searchRegExp = new RegExp ('.*' + search + '.*','i')
    const filter={
       $or:[
         {name: {$regex:searchRegExp }}
       ]   
    }
    console.log('your search',search)
    const categories = await category.find() 
    if (!categories) {
        throw new ApiError(404, 'categories not found!')
      }
    return categories
}

export const getTheCategory = async(slug:string)=>{
    const singleCategory = await category.findOne({slug: slug})
    if (!singleCategory) {
        throw new ApiError(404, 'categories not found!')
      }
    return singleCategory
}

export const createTheCategory = async(categoryInput: CategoryInput)=>{
    const exsistCategory= await category.exists({name: categoryInput.name})
    if(exsistCategory){
        throw new ApiError(404, "category exsist")
    }
 
    categoryInput.slug = slugify(categoryInput.name, { lower: true })
    const newCategory = new category(categoryInput)
     await newCategory.save() 
    return newCategory
}

export const deleteTheCategory= async (slug:string)=>{
    const deletedCategory = await category.findOneAndDelete({slug: slug}) 
    if (!deletedCategory) {
        throw new ApiError(404, 'Product not found!')
      }
    return deletedCategory
}

export const updateTheCategory= async(slug: any , updateCategoryData: categoryI)=>{
    const categoryExists = await category.findOne({ slug: slug })
  if (!categoryExists) {
    throw new ApiError(404, 'category not found!')
  }
if (updateCategoryData.name && updateCategoryData.name !== categoryExists.name){
    updateCategoryData.slug = slugify(updateCategoryData.name, {lower: true})
}
    const updatedCategory =await category.findOneAndUpdate(
        {slug: slug},
        updateCategoryData,
        {new: true})  
        return updatedCategory
}