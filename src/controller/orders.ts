import {Request,Response , NextFunction } from "express";
import order from "../models/order";

export const getAllOrders = async (req: Request , res: Response , next:NextFunction)=>{
try {
  const orders = await order.find().populate('products')
    res.status(200).json(orders)  
} catch (error) {
    next(error)
}
    
  }

  export const createOrder = async (req: Request , res: Response , next:NextFunction)=>{ 
// try {
//     const { name, products } = req.body

//   const order = new Order({
//     name,
//     products,
//   })
//   console.log('orderId:', order._id)

//   const user = new User({
//     name: 'Walter',
//     order: order._id,
//   })

//   await order.save()
//   await user.save()
//   res.json(order)

// } catch (error) {
//     next(error)
// }
  }