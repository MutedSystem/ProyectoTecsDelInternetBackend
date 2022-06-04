import { Router } from "express";
import { productsImageUpload } from '../middlewares/index';

import * as productController from '../controllers/products.controller';


const router = Router();

router.get('/', productController.getProducts);

router.get('/:idProducto', productController.getProduct);

router.post('/create', productsImageUpload.uploadImages, productController.createProduct);

export default router;