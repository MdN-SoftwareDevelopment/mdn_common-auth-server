import { Router } from 'express';
import {
  getToken,
  getUser,
  postUser,
  verifyUser
} from '../controllers/user.controller.js';

const router = Router();

router.post('/new', postUser);
router.get('/verify/:id_application/:email', verifyUser);
router.get('/token/:id_application/:email', getToken);
router.get('/:token', getUser);

export default router;
