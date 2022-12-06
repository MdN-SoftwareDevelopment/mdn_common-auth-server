import { Router } from 'express';
import { getApps } from '../controllers/students.controller.js';

const router = Router();

router.get('/apps', getApps);

// TODO: CREATE ROUTES FOR PROJECTS

export default router;
