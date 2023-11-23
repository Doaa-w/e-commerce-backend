import {Request, Response , NextFunction } from "express";

import ApiError from '../errors/ApiError';

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

export const signup = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { first_name, last_name, email, password, phone } = req.body;
        switch (true) {
            case !first_name:
                next(ApiError.badRequest('first name is required'));
                return;
            case !last_name:
                next(ApiError.badRequest('last name is required'));
                return;
            case !email:
                next(ApiError.badRequest('email is required'));
                return;
            case !password:
                next(ApiError.badRequest('password is required'));
                return;
            case !phone:
                next(ApiError.badRequest('phone number is required'));
                return;
        }
        const userExist = await User.exists({email});
        if (userExist) {
            next(ApiError.badRequest('User account already exists'));
        }
        const user = new User ({
            first_name,
            last_name,
            email,
            password,
            phone
        });
        await user.save();
        res.status(201).send({ message: 'User account is created' });
    }
    catch(error) {
        next(error);
    }
};