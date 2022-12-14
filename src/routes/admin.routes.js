import { Router } from 'express';
import {
  postAdmin,
  verifyExistsAdmin,
  verifyCredentialsAdmin
} from '../controllers/admin.controller.js';

const router = Router();

router.post('/new', postAdmin);
router.get('/verify/:email', verifyExistsAdmin);
router.get('/verify/credentials/:email/:password', verifyCredentialsAdmin);

export default router;
