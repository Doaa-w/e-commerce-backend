import { Order } from '../models/orderSchema';

import { IOrder } from '../types/orderType';
import { createHttpError } from '../util/createHttpError';

export const getOrders = async () => {
  const category = await Order.find().populate('products').populate('user');
  return category;
};

// get single order
export const findOrder = async (_id: string) => {
  const singleOrder = await Order.findById(_id).populate('products').populate('user');
  if (!singleOrder) {
    throw createHttpError(404, `Order not found with id ${_id}`);
  }
  return singleOrder;
};

export const createNewOrder = async (order: IOrder) => {
  const { products, user } = order;
  const newOrder = await Order.create({ products, user });
  await newOrder.validate();
  return newOrder;
};

export const updateOrder = async (id: string, order: IOrder) => {
  const orderToValidate = new Order(order);
  await orderToValidate.validate();
  const updatedOrder = await Order.findByIdAndUpdate({ _id: id }, order, { new: true });
  if (!updatedOrder) {
    throw createHttpError(404, `order not found with id ${id}`);
  }
  return updatedOrder;
};

export const deleteOrder = async (id: string) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder) {
    throw createHttpError(404, `Order not found with id ${id}`);
  }
  return deletedOrder;
};