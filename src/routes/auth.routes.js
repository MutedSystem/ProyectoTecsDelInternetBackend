import { Router } from 'express';

import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/singin',authController.singin);

router.post('/singup',authController.singup);

export default router;