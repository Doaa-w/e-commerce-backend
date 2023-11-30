import { Request, Response , NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { dev } from "../config";
import ApiError from "../errors/ApiError";

import User from "../models/user";
import { findAllUsers, updateSingleUserById, removeUserById, userExist, findSingleUser, updateBanStatusById } from "../services/userService";
import { handleSendEmail } from "../helper/sendEmail";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await findAllUsers();
        res.status(200).send({ 
            message: 'All users are returned',
            payload:  users
        });
    } catch(error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await findSingleUser(id);
        res.status(200).send({ 
            message: 'User data is returned',
            payload:  user
        });
    } catch(error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { first_name, last_name, email, password, phone, address } = req.body;
        await userExist(email);
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { //token payload? it has always be an object
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
            address
        };
        const token = jwt.sign(userData, dev.app.jwtUserActivationKey, { expiresIn: '1m' }); 
        const emailData = {
            email: email,
            subject: 'Activate you account',
            html: 
            `
            <h3>Dear ${first_name} ${last_name},</h3>

            <p>Thank you for signing up for our shop. We are excited to have you on board!
            To complete your account activation, please <a href="http://localhost:8080/api/users/activate/${token}">Click Here</a>.</p>
            
            <p>If you did not sign up for an account or received this email by mistake, please disregard it.</p>
            
            <h4>Welcome aboard, and thank you for choosing our shop!</h4>
            `
        };
        await handleSendEmail(emailData);
        res.status(200).send({ 
            message: 'Check your email to activate your account',
            token: token 
        });
    } catch(error) {
        next(error);
    }
};

export const activateUserAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.body.token;
        if (!token) {
            const error = new ApiError(404, "Please provide a token");
            throw error;
        }
        const decodedToken = jwt.verify(token, dev.app.jwtUserActivationKey);
        await User.create(decodedToken);        
        res.status(201).send({message: 'User account created successfully'});   
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            const tokenExpiredError = new ApiError(401, 'Token has expired');
            next(tokenExpiredError);
        }
        else if (error instanceof JsonWebTokenError) {
            const tokenInvalidError =  new ApiError(401, 'Invalid token');
            next(tokenInvalidError);
        }
        else {
            next(error);
        }
    }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await updateSingleUserById(req);
        res.status(200).send({
            message: 'User data updated successfully',
            payload: user
        });
    } catch(error) {
        next(error);
    }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await removeUserById(id);
        res.status(204).json();
    } catch(error) {
        next(error);
    }
};

export const banUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await updateBanStatusById(req);
        if (user.isBanned) {
            res.status(200).send({
                message: 'The user has been successfully banned',
            });
        }
        else if (!user.isBanned) {
            res.status(200).send({
                message: 'The user has been successfully unbanned',
            });
        }
    } catch(error) {
        next(error);
    }
};