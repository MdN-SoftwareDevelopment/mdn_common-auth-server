import { Router } from 'express';
import {
  getAdminToken,
  getAllApps,
  getAllUsers,
  postAdmin,
  verifyCredentialsAdmin,
  verifyExistsAdmin
} from '../controllers/admin.controller.js';

const router = Router();

router.post('/new', postAdmin);
router.get('/verify/:email', verifyExistsAdmin);
router.get('/verify/credentials/:email/:password', verifyCredentialsAdmin);
router.get('/token/:email', getAdminToken);
router.get('/apps/:id_admin', getAllApps);
router.get('/apps/users/:id_app', getAllUsers);

export default router;
