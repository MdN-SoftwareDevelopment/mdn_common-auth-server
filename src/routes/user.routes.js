import { Router } from 'express';
import {
  getToken,
  postUser,
  verifyUser
} from '../controllers/user.controller.js';

const router = Router();

router.post('/new', postUser);
router.get('/verify/:id_application/:email', verifyUser);
router.get('/token/:id_application/:email', getToken);

export default router;
