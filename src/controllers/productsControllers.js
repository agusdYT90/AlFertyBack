import { ProductsServices } from '../services/productsServices.js';

export const ProductsControllers = {

    async productsTodos(req, res, next) {
        try {
            const products = await ProductsServices.ObtenerTodos(req.user);
            res.status(200).json(products);
        } catch (err) {
            console.error("Error en productsTodos:", err.message);
            next(err);
        }
    },

    async productsId(req, res, next) {
        try {
            const { id } = req.params;
            const product = await ProductsServices.ObtenerID(req.user, id);
            res.status(200).json(product);
        } catch (err) {
            console.error("Error en productsId:", err.message);
            next(err);
        }
    },

    async productsCrear(req, res, next) {
        try {
            const product = await ProductsServices.Crear(req.user, req.body);
            res.status(201).json(product);
        } catch (err) {
            console.error("Error en productsCrear:", err.message);
            next(err);
        }
    },

    async productsActualizar(req, res, next) {
        try {
            const { id } = req.params;
            const product = await ProductsServices.Actualizar(req.user, { id, ...req.body });
            res.status(200).json(product);
        } catch (err) {
            console.error("Error en productsActualizar:", err.message);
            next(err);
        }
    },

    async productsEliminar(req, res, next) {
        try {
            const { id } = req.params;
            const result = await ProductsServices.Eliminar(req.user, id);
            res.status(200).json({ message: 'Producto eliminado', ...result });
        } catch (err) {
            console.error("Error en productsEliminar:", err.message);
            next(err);
        }
    }
};
