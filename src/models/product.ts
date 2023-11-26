import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify';

interface IProduct extends Document {
  name: string;
  description: string;
  quantity: number;
  slug: string;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }
)

export default mongoose.model('Product', productSchema)
