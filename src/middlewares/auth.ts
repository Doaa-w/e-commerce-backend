import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import ApiError from '../errors/ApiError';
import User from '../models/userSchema';
import { verifyToken } from '../util/verifyToken';

interface CustomRequest extends Request {
    userId?: string;
}

export const isLoggedIn = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken: string = req.cookies.access_token;
        if (!accessToken) {
            throw new ApiError(401, "You are not logged in");
        }
        const verifiedAccessToken: JwtPayload = verifyToken(accessToken);
        if (!verifiedAccessToken) {
            throw new ApiError(401, "Invalid access token");
        }
        req.userId = verifiedAccessToken._id;
        next();
    } catch(error) {
        next(error);
    }
};

export const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken: string = req.cookies.access_token;
        if (accessToken) {
            throw new ApiError(401, "You are already logged in");
        }
        next();
    } catch(error) {
        next(error);
    }
};

export const isAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.userId);
        if (user?.isAdmin) {
            throw new ApiError(403, "You are not authorized to access this route");
        }
        next();
    } catch(error) {
        next(error);
    }
};