import { Router } from 'express';
import {
  postAdmin,
  verifyExistsAdmin
} from '../controllers/admin.controller.js';

const router = Router();

router.post('/new', postAdmin);
router.get('/verify/:email', verifyExistsAdmin);

export default router;
