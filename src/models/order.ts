import { Schema, model } from 'mongoose'

import { IProduct } from '../types/product'
import { IOrder } from '../types/order'

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  { timestamps: true }
)
orderSchema.path('products').validate(function (value: IProduct['slug'][]) {
  return value.length >= 1
}, 'Must have at least one product')

export const Order = model<IOrder>('Order', orderSchema)