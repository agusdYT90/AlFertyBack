import { AuthService } from '../services/authServices.js';

export const AuthController = {

    async login(req, res, next) {

        try {
            const { email, password } = req.body;
            const { token, user } = await AuthService.login(email, password);
            res.status(200).json({
                tokenType: 'Bearer',
                token,
                user
            });
            
        } catch (err) {
            next(err);
        }
    }
};
