import { Router } from 'express';
import {
  postApplication,
  postRoles
} from '../controllers/application.controller.js';

const router = Router();

router.post('/new', postApplication);
router.post('/roles/:id_application', postRoles);

export default router;
