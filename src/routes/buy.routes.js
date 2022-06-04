import { Router } from "express";

import { authJWT } from '../middlewares/index';

import * as buyController from '../controllers/buy.controller';

const router = Router();

router.post('/',[authJWT.verifyUserToken],buyController.makeBuy);

router.get('/see',[authJWT.verifyUserToken],buyController.seeBuys);

export default router;