import mongoose from 'mongoose';
import slugify from 'slugify';

import { OrderDocument } from '../types';

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  slug: {
    type: String,
    unique: true,
  },
  user: {
    type: String, // Use the slug of the User model
    ref: 'User',
    required: true,
  },
});

orderSchema.pre<OrderDocument>('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model<OrderDocument>('Order', orderSchema);