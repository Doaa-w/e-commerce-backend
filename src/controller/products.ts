import { Request, Response, NextFunction } from "express";
import Product from "../models/product";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    console.log('products:', products);
    res.status(200).json({ message: 'All products are here', payload: products });
  } catch (error) {
    next(error);
  }
};

export const getSingleProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productSlug = req.params.slug;

    const product = await Product.findOne({ slug: productSlug });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product found', payload: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
};

export const deleteProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productSlug = req.params.slug;

    const deletedProduct = await Product.findOneAndDelete({ slug: productSlug });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found for deletion' });
    }

    res.status(200).json({ message: 'Product deleted successfully', payload: deletedProduct });
  } catch (error) {
    next(error);
  }
};
