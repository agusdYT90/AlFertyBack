import { ProductsServices } from '../services/productsServices.js';

export const ProductsControllers = {

    async productsTodos(req, res, next) {

        try {

            const products = await ProductsServices.ObtenerTodos();
            res.status(200).json(products);
        }

        catch (err) {
            next(err);
        }
    },

    async productsId(req, res, next) {

        try {
            const { id } = req.params;
            const product = await ProductsServices.ObtenerID(id);
            res.status(200).json(product);
        }
        
        catch (err) {
            next(err);
        }
    },

    async productsCrear(req, res, next) {

        try {
            const product = await ProductsServices.Crear(req.body);
            res.status(201).json(product);
        } 
        
        catch (err) {
            next(err);
        }
    },

    async productsActualizar(req, res, next) {

        try {
            const { id } = req.params;
            const product = await ProductsServices.Actualizar({ id, ...req.body });
            res.status(200).json(product);
        } 
        
        catch (err) {
            next(err);
        }
    },

    async productsEliminar(req, res, next) {

        try {
            const { id } = req.params;
            const result = await ProductsServices.Eliminar(id);
            res.status(200).json({ message: 'Producto eliminado', ...result });
        } 
        
        catch (err) {
            next(err);
        }
    }
};
