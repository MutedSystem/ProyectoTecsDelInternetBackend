import {
    Router
} from "express";
import {
    authJWT
} from '../middlewares/index';

import * as productController from '../controllers/products.controller';

const router = Router();

router.get('/', productController.getProducts);

router.get('/:idProducto', productController.getProduct);

export default router;