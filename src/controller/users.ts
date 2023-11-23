import {Request, Response , NextFunction } from "express";

import User from '../models/user';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).send({ 
            message: 'All users are returned',
            payload:  users
        });
    }
    catch(error) {
        next(error);
    }
};