import { Router } from 'express';
import {
  getApplication,
  postApplication,
  verifyAppCredentials
} from '../controllers/application.controller.js';

const router = Router();

router.post('/new', postApplication);
router.get('/:id_app', getApplication);
router.get('/verify/app/:app_id', verifyAppCredentials);
router.get('verify/:name', verifyIfAppExist);

export default router;
