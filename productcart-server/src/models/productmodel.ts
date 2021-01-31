import mongoose from 'mongoose';

export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
};

export type ProductDocument = mongoose.Document & Product;

export const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);
