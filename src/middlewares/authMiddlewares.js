import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = (req, res, next) => {

    try {
        
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            const error = new Error('Authorization header requerido');
            error.status = 401;
            throw error;
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            const error = new Error('Formato de Authorization inválido. Use: Bearer <token>');
            error.status = 401;
            throw error;
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            const error = new Error('Configuración del servidor inválida');
            error.status = 500;
            throw error;
        }

        const payload = jwt.verify(token, secret);

        req.user = { id: payload.sub, role: payload.role, email: payload.email };
        next();

    } catch (err) {

        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            err.status = 401;
            err.message = 'Token inválido o expirado';
        }

        next(err);
    }
};
