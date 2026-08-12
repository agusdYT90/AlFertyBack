import { Router } from "express";
import { notificationController } from "../controllers/notificationControllers.js";

const router = Router();

router.get("/notification", notificationController.notification);

export default router;