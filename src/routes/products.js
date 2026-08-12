import { Router } from 'express';
import { ProductsControllers } from '../controllers/productsControllers.js';
import { authenticateUser, authenticateAdmin } from '../middlewares/authMiddlewares.js';

const router = Router();

router.get('/api/products', ProductsControllers.productsTodos);
router.get('/api/products/:id', ProductsControllers.productsId);

router.post('/api/products', authenticateAdmin, ProductsControllers.productsCrear);
router.put('/api/products/:id', authenticateAdmin, ProductsControllers.productsActualizar);
router.delete('/api/products/:id', authenticateAdmin, ProductsControllers.productsEliminar);

export default router;
