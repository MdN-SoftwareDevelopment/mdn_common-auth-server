import { Router } from 'express';
import {
  getApplication,
  postApplication
} from '../controllers/application.controller.js';

const router = Router();

router.post('/new', postApplication);
router.get('/:id_app', getApplication);

export default router;
