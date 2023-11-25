import { Request, Response, NextFunction } from "express";

import User from '../models/user';
import { findAllUsers } from "../services/userService";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await findAllUsers();
        res.status(200).send({ 
            message: 'All users are returned',
            payload:  users
        });
    }
    catch(error) {
        next(error);
    }
};