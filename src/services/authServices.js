import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const USER = {
    id: 'user_001',
    email: 'MFCR090205@gmail.com',
    password: 'MFCR@RJDM2026',
    role: 'admin'
};

export const AuthService = {

    async login(email, password) {

        if (!email || !password) {
            const error = new Error('Email y password son requeridos');
            error.status = 400;
            throw error;
        }

        if (email !== USER.email || password !== USER.password) {
            const error = new Error('Credenciales inválidas');
            error.status = 401;
            throw error;
        }

        const payload = {
            id: USER.id,
            email: USER.email,
            role: USER.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return { token, user: { id: USER.id, email: USER.email, role: USER.role } };
    }
};
