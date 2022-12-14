import { Router } from 'express';
import adminRoutes from './admin.routes.js';
import applicatinRoutes from './application.routes.js';
import userRoutes from './user.routes.js';

const router = Router();

router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/app', applicatinRoutes);

export default router;
