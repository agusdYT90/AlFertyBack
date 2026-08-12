import { ProductsModels } from "../models/productsModels.js";

export const ProductsServices = {

    async ObtenerTodos(user) {
        try {
            return await ProductsModels.productsAll();
        } catch (err) {
            console.error("Error en ObtenerTodos:", err.message);
            throw err;
        }
    },

    async ObtenerID(user, id) {
        try {
            return await ProductsModels.productsId(id);
        } catch (err) {
            console.error("Error en ObtenerID:", err.message);
            throw err;
        }
    },

    async Crear(user, data) {
        try {
            if (user.role !== 'admin') {
                throw new Error('Acceso denegado: solo admin puede crear productos');
            }
            return await ProductsModels.productsCreate(data);
        } catch (err) {
            console.error("Error en Crear:", err.message);
            throw err;
        }
    },

    async Actualizar(user, data) {
        try {
            if (user.role !== 'admin') {
                throw new Error('Acceso denegado: solo admin puede actualizar productos');
            }
            return await ProductsModels.productsUpdate(data);
        } catch (err) {
            console.error("Error en Actualizar:", err.message);
            throw err;
        }
    },

    async Eliminar(user, id) {
        try {
            if (user.role !== 'admin') {
                throw new Error('Acceso denegado: solo admin puede eliminar productos');
            }
            return await ProductsModels.productsDelete(id);
        } catch (err) {
            console.error("Error en Eliminar:", err.message);
            throw err;
        }
    }
};
