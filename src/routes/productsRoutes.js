import { Router } from 'express';
import { ProductsControllers } from '../controllers/productsControllers.js';
import { authenticate } from '../middlewares/authMiddlewares.js';

const router = Router();

router.get('/', ProductsControllers.productsTodos);
router.get('/:id', ProductsControllers.productsId);

router.post('/', authenticate, ProductsControllers.productsCrear);
router.put('/:id', authenticate, ProductsControllers.productsActualizar);
router.delete('/:id', authenticate, ProductsControllers.productsEliminar);

export default router;
