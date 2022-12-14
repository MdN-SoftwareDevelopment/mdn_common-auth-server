import { Router } from 'express';
import {
  getUser,
  getUserToken,
  postUser,
  verifyCredentialsUser,
  verifyExistsUser
} from '../controllers/user.controller.js';

const router = Router();

router.post('/new', postUser);
router.get(
  '/verify/credentials/:id_app/:email/:password',
  verifyCredentialsUser
);
router.get('/verify/exist/:id_app/:email', verifyExistsUser);
router.get('/token/:id_app/:email', getUserToken);
router.get('/:token', getUser);

export default router;
