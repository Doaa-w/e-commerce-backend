import {Request, Response , NextFunction } from "express";

import User from '../models/user';
import { createUser } from "../services/userService";

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

export const register = async (req: Request, res: Response, next:NextFunction) => {
    try {
        await createUser(req, next);
        res.status(201).send({ message: 'User account is created' });
    }
    catch(error) {
        next(error);
    }
};