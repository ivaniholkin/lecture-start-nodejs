import { Router } from 'express';
import { authService } from '../services/authService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();
// TODO: Implement login action (get the user if it exist with entered credentials)

router.post(
    '/login',
    (req, res, next) => {
        try {
            const { email } = req.body;
            const user = authService.login({ email: email });
            if (!user) {
                throw new Error('user not found in our database. Please login');
            } else {
                req.body = {
                    ...user,
                };
            }
        } catch ({ message }) {
            return (req.body = {
                error: true,
                message,
            });
        } finally {
            next();
        }
    },
    responseMiddleware
);

export { router };
