import { Router } from 'express';
import {
  postAdmin,
  verifyExistsAdmin,
  verifyCredentialsAdmin,
  getAdminToken
} from '../controllers/admin.controller.js';

const router = Router();

router.post('/new', postAdmin);
router.get('/verify/:email', verifyExistsAdmin);
router.get('/verify/credentials/:email/:password', verifyCredentialsAdmin);
router.get('/token/:email', getAdminToken);

export default router;
