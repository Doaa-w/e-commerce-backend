import {Request,Response , NextFunction } from "express";
import user from "../models/user";

export const getAllUsers = async (req: Request , res: Response , next:NextFunction)=>{


const users = await user.find().populate('order')
res.json({
  users,
})
}

export const getSingleUser = (req: Request , res: Response , next:NextFunction)=>{
try {
   res.status(200).json({ msg: 'done', user: req.user, }) 
} catch (error) {
    next(error)
}
    
}
