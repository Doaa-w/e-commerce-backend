import {Request,Response , NextFunction } from "express";
import order from "../models/order";


 // export const createOrder = async (req: Request , res: Response , next:NextFunction)=>{ 
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
//  }
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, products, slug } = req.body;

    const newOrder = new order({
      name,
      products,
      slug,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await order.find().populate('products');
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderSlug = req.params.slug;

    const orders = await order.findOne({ slug: orderSlug }).populate('products');

    if (!orders) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderSlug = req.params.slug;
    const { name, products } = req.body;

    const updatedOrder = await order.findOneAndUpdate(
      { slug: orderSlug },
      { name, products },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrderBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderSlug = req.params.slug;

    const deletedOrder = await order.findOneAndDelete({ slug: orderSlug });

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
