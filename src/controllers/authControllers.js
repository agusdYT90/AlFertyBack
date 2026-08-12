import { authServices } from '../services/usersServices.js';

export const authControllers = {
    
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const result = await authServices.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            console.error("Error en login:", error.message);
            next(error);
        }
    },

    register: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const result = await authServices.register(email, password);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error en register:", error.message);
            next(error);
        }
    }
};
