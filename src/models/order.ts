import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';

export type OrderDocument = Document & {
  name: string;
  products: mongoose.Schema.Types.ObjectId[];
  slug: string;
  user: string; // Reference to User model using slug
};

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

// Middleware to automatically generate and set the slug before saving the order
orderSchema.pre<OrderDocument>('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model<OrderDocument>('Order', orderSchema);
