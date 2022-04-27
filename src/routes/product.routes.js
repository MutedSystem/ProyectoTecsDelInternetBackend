import { Router } from "express";
import { authJWT } from '../middlewares/index';

import * as productController from '../controllers/products.controller';


const router = Router();

router.get('/',authJWT.verifyUserToken,productController.getProducts);

router.get('/:idProducto',authJWT.verifyUserToken,productController.getProduct);

export default router;