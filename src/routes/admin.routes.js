import { Router } from 'express';
import { postAdmin } from '../controllers/admin.controller.js';

const router = Router();

router.post('/new', postAdmin);

export default router;
