import { Router } from "express";

import * as buyController from '../controllers/buy.controller';

const router = Router();

router.post('/',buyController.makeBuy);

export default router;