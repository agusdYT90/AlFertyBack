import { Router } from 'express';
import { usersControllers } from '../controllers/usersControllers.js';
import { authenticateUser, authenticateAdmin } from '../middlewares/authMiddlewares.js';

const router = Router();

router.get('/', authenticateAdmin, usersControllers.usersTodos);
router.get('/:id', authenticateUser, usersControllers.usersId);
router.post('/', authenticateUser, usersControllers.usersCrear);
router.put('/:id', authenticateUser, usersControllers.usersActualizar);
router.delete('/:id', authenticateUser, usersControllers.usersEliminar);

export default router;
