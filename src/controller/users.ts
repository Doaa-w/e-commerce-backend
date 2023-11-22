// import {Request, Response , NextFunction } from "express";

// import User from '../models/user';
// import ApiError from '../errors/ApiError'

// export const getAllUsers = async (req: Request , res: Response , next:NextFunction)=>{
//   const users = await User.find().populate('order');
//   res.json({ 
//     users
//   });
// };

// export const createUser = (req: Request , res: Response , next:NextFunction) => {
//   const { id, first_name } = req.body

//   if (!id || !first_name) {
//     next(ApiError.badRequest('id and username are required'))
//     return
//   }
//   const updatedUsers = [{ id, first_name }, ...users]
//   res.json({
//     msg: 'done',
//     users: updatedUsers,
//   })
// };

// export const getSingleUser = (req: Request , res: Response , next:NextFunction)=>{
//   try {
//     res.status(200).json({ msg: 'done', user: req.user, }) 
//   }
//   catch (error) {
//     next(error);
//   }
// };

// export const UpdateUser = (req: Request , res: Response , next:NextFunction) => {
//   const { first_name } = req.body

//   const updatedUsers = users.map((user) => {
//     if (user.id === req.user.id) {
//       return {
//         ...user,
//         first_name,
//       }
//     }
//     return user
//   })
//   res.json({ users: updatedUsers })
// };

// export const deleteUser = (req: Request , res: Response , next:NextFunction) => {
//   const updatedUsers = users.filter((user) => user.id !== req.user.id)
//   res.json({ users: updatedUsers })
// };