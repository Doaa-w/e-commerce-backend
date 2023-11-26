import { NextFunction, Request } from "express";
import slugify from "slugify";

import ApiError from "../errors/ApiError";
import User from "../models/user";

export const findAllUsers = async () => {
    const users = await User.find();
    return users;
}

export const userExist = async (email: string) => {
    const userExist = await User.exists({email: email});
    if (userExist) {
        const error = new ApiError(409, "User account already exists")
        throw error;       
    }
}

export const createUser = async (req: Request, next: NextFunction) => {
    const { first_name, last_name, email, password, phone, address } = req.body;
    await userExist(email);
    const user = new User ({
        first_name,
        last_name,
        email,
        password,
        phone,
        address
    });
    await user.save();
    return user;
}

export const updateSingleUserById = async (req: Request) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) {
    const error = new ApiError(404, "User is not found");
    throw error;
    }
    await User.findOneAndUpdate({id: id}, req.body, {new: true});
    return user;
}