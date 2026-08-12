import { UsersServices } from '../services/usersServices.js';

export const usersControllers = {

    async usersTodos(req, res, next) {
        try {
            const users = await UsersServices.ObtenerTodos(req.user);
            res.status(200).json(users);
        } catch (err) {
            console.error("Error en usersTodos:", err.message);
            next(err);
        }
    },

    async usersId(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UsersServices.ObtenerEmail(req.user, id);
            res.status(200).json(user);
        } catch (err) {
            console.error("Error en usersId:", err.message);
            next(err);
        }
    },

    async usersCrear(req, res, next) {
        try {
            const user = await UsersServices.Crear(req.user, req.body);
            res.status(201).json(user);
        } catch (err) {
            console.error("Error en usersCrear:", err.message);
            next(err);
        }
    },

    async usersActualizar(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UsersServices.Actualizar(req.user, { email: id, ...req.body });
            res.status(200).json(user);
        } catch (err) {
            console.error("Error en usersActualizar:", err.message);
            next(err);
        }
    },

    async usersEliminar(req, res, next) {
        try {
            const { id } = req.params;
            const result = await UsersServices.Eliminar(req.user, id);
            res.status(200).json({ message: 'Usuario eliminado', ...result });
        } catch (err) {
            console.error("Error en usersEliminar:", err.message);
            next(err);
        }
    }
};
