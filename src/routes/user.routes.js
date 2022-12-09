import { Router } from 'express';
import { postUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/new/:id_application', postUser);

export default router;
