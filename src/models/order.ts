import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';

export type OrderDocument = Document & {
  name: string;
  products: mongoose.Schema.Types.ObjectId[];
  slug: string;
};

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
  },
  slug: {
    type: String,
    unique: true,
  },
}) ;

orderSchema.pre<OrderDocument>('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model<OrderDocument>('Order', orderSchema);
