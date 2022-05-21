import { Router } from "express";

import * as buyController from '../controllers/buy.controller';

const router = Router();

router.post('/',buyController.makeBuy);

router.get('/see/:idUsuario',buyController.seeBuys);

export default router;