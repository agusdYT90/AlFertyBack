import { UsersModels } from "../models/usersModels.js";

export const UsersServices = {

    async ObtenerTodos(user) {
        try {
            if (user.role !== 'admin') {
                throw new Error('Acceso denegado: solo admin puede ver todos los usuarios');
            }
            return await UsersModels.usersAll();
        } catch (err) {
            console.error("Error en ObtenerTodos:", err.message);
            throw err;
        }
    },

    async ObtenerEmail(user, email) {
        try {
            if (user.role === 'admin' || user.email === email) {
                return await UsersModels.usersId(email);
            }
            throw new Error('Acceso denegado: no puedes ver datos de otros usuarios');
        } catch (err) {
            console.error("Error en ObtenerEmail:", err.message);
            throw err;
        }
    },

    async Crear(user, data) {
        try {
            if (user.role === 'admin' || user.email === data.email) {
                return await UsersModels.usersCreate(data);
            }
            throw new Error('Acceso denegado: no puedes crear usuarios distintos a ti');
        } catch (err) {
            console.error("Error en Crear:", err.message);
            throw err;
        }
    },

    async Actualizar(user, data) {
        try {
            if (user.role === 'admin' || user.email === data.email) {
                return await UsersModels.usersUpdate(data);
            }
            throw new Error('Acceso denegado: no puedes actualizar datos de otros usuarios');
        } catch (err) {
            console.error("Error en Actualizar:", err.message);
            throw err;
        }
    },

    async Eliminar(user, email) {
        try {
            if (user.role === 'admin' || user.email === email) {
                return await UsersModels.usersDelete(email);
            }
            throw new Error('Acceso denegado: no puedes eliminar otros usuarios');
        } catch (err) {
            console.error("Error en Eliminar:", err.message);
            throw err;
        }
    }
};
