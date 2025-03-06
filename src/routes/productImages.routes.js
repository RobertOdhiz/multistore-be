import express from 'express';
import { createProductImage, deleteProductImage } from '../controllers/productImages.controller';

const ProductImageRoutes = express.Router();

ProductImageRoutes.post('/', createProductImage);
ProductImageRoutes.delete('/:imageId', deleteProductImage);

export default ProductImageRoutes;