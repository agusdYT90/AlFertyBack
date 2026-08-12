import { Router } from 'express';
import { NotificationController } from '../controllers/notificationControllers.js';

const router = Router();

router.post('/discord', NotificationController.notify);

export default router;
