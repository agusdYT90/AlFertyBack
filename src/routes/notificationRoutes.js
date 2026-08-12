import { Router } from 'express';
import { notificationControllers } from '../controllers/notificationControllers.js';

const router = Router();

router.post('/discord', notificationControllers.discordNotification);

export default router;
