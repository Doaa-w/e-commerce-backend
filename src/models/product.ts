import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify';

interface IProduct extends Document {
  name: string;
  description: string;
  quantity: number;
  slug: string;
}

const productSchema = new Schema<IProduct>(
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
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre<IProduct>('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
