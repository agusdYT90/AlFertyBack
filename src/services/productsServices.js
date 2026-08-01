import { ProductsModels } from "../models/productsModels.js";

export const ProductsServices = {

    async ObtenerTodos() {

        try {
            return await ProductsModels.productsAll();
        }
        
        catch (err) {
            throw err;
        }

    },

    async ObtenerID(id) {
        
        try {
            return await ProductsModels.productsId(id);
        }
        
        catch (err) {
            throw err;
        }
    },

    async Crear(data) {

        try {
            return await ProductsModels.productsCreate(data);
        } 
        
        catch (err) {
            throw err;
        }
    },

    async Actualizar(data) {
        
        try {
            return await ProductsModels.productsUpdate(data);
        }
        
        catch (err) {
            throw err;
        }
    },

    async Eliminar(id) {

        try {
            return await ProductsModels.productsDelete(id);
        }
        
        catch (err) {
            throw err;
        }
    }
};
