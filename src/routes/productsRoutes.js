import { Router } from 'express';
import { ProductsControllers } from '../controllers/productsControllers.js';
import { authenticateUser, authenticateAdmin } from '../middlewares/authMiddlewares.js';

const router = Router();

router.get('/', ProductsControllers.productsTodos);
router.get('/:id', ProductsControllers.productsId);

router.post('/', authenticateAdmin, ProductsControllers.productsCrear);
router.put('/:id', authenticateAdmin, ProductsControllers.productsActualizar);
router.delete('/:id', authenticateAdmin, ProductsControllers.productsEliminar);

export default router;
