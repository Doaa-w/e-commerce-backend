import { Request, Response , NextFunction } from "express";

import { verifyUserData } from "../services/auth";
import { generateToken } from "../util/generateToken";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await verifyUserData(req);
        const accessToken = generateToken(user._id);
        res.cookie(
            'access_token',
             accessToken,
             {
                maxAge: 30 * 60 * 1000, // 30 minutes
                httpOnly: true,
                sameSite: 'none'
            });
        res.status(200).send({ 
            message: 'You have successfully logged in',
            payload:  user
        });
    } catch(error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('access_token');
        res.status(200).send({ 
            message: 'You have successfully logged out',
        });
    } catch(error) {
        next(error);
    }
};