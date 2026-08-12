import { Router } from 'express';
import { usersControllers } from '../controllers/usersControllers.js';
import { authenticateUser, authenticateAdmin } from '../middlewares/authMiddlewares.js';

const router = Router();

router.get('/api/users', authenticateAdmin, usersControllers.usersTodos);
router.get('/api/users/:id', authenticateUser, usersControllers.usersId);
router.post('/api/users', authenticateUser, usersControllers.usersCrear);
router.put('/api/users/:id', authenticateUser, usersControllers.usersActualizar);
router.delete('/api/users/:id', authenticateUser, usersControllers.usersEliminar);

export default router;
