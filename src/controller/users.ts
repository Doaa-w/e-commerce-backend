import { Request, Response , NextFunction } from "express";

import { findAllUsers, createUser, updateSingleUserById, removeUserById } from "../services/userService";

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

export const register = async (req: Request, res: Response, next:NextFunction) => {
    try {
        await createUser(req, next);
        res.status(201).send({ message: 'User account is created' });
    }
    catch(error) {
        next(error);
    }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await updateSingleUserById(req);
        res.status(200).send({
            message: 'User data updated successfully',
            payload: user
        });
    }
    catch(error) {
        next(error);
    }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await removeUserById(req);
        res.status(204).json();
    }
    catch(error) {
        next(error);
    }
};