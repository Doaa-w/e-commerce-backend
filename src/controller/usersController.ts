import { Request, Response , NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from "../models/userSchema";
import { findAllUsers, findSingleUser, isUserExist, isTokenExist, updateSingleUser, removeUser, updateBanStatus } from "../services/userService";
import { handleSendEmail } from "../helper/sendEmail";
import { generateToken } from "../util/generateToken";
import { verifyToken } from "../util/verifyToken";
import { EmailDataType, UserInputType } from "../types/userType";
import ApiError from "../errors/ApiError";

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
        await isUserExist(email);
        const hashedPassword = await bcrypt.hash(password, 10);
        const tokenPayload: UserInputType = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
            address
        };
        const token = generateToken(tokenPayload);
        const emailDetails: EmailDataType = {
            email: email,
            subject: 'Activate your account',
            html: 
            `
            <h3>Dear ${first_name} ${last_name},</h3>

            <p>Thank you for signing up for our shop. We are excited to have you on board!
            To complete your account activation, please <a href="http://localhost:8080/api/users/activate/${token}">Click Here</a>.</p>
            <p>If you did not sign up for an account or received this email by mistake, please disregard it.</p>
            <h4>Welcome aboard, and thank you for choosing our shop!</h4>
            `
        };
        await handleSendEmail(emailDetails);
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
        const token: string = req.body.token;
        await isTokenExist(token);
        const verifiedToken = verifyToken(token);
        await User.create(verifiedToken);        
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
        const user = await updateSingleUser(req);
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
        await removeUser(id);
        res.status(204).json();
    } catch(error) {
        next(error);
    }
};

export const banUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const isBanned = req.body.isBanned;
        const user = await updateBanStatus(id, isBanned);
        if (user.isBanned) {
            res.status(200).send({
                message: 'The user has been successfully banned',
            });
        }
        else {
            res.status(200).send({
                message: 'The user has been successfully unbanned',
            });
        }
    } catch(error) {
        next(error);
    }
};