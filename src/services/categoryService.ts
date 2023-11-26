import slugify from "slugify"
import { category } from "../models/category"


export const getAllTheCategory = async()=>{
    const categories = await category.find() 
    return categories
}

export const getTheCategory = async(slug:string)=>{
    const singleCategory = await category.findOne({slug: slug})
    return singleCategory
}

export const createTheCategory = async(name: string)=>{
    const exsistCategory= await category.exists({name: name})
    if(exsistCategory){
        throw Error ( "category exsist")
    }
    const newCategory = new category({
        name: name,
        slug: slugify(name),
    })
     newCategory.save() 
    return newCategory
}

export const deleteTheCategory= async (slug:string)=>{
    const deletedCategory = await category.deleteOne({slug: slug}) 
    return deletedCategory
}

export const updateTheCategory= async(slug: string , name: string)=>{
    const updatedCategory =await category.findOneAndUpdate(
        {slug: slug},
        {name: name, slug: name? slugify(name): slug},
        {new: true})  
        return {updatedCategory}
}