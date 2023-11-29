import { Request } from "express";

import ApiError from "../errors/ApiError";
import User from "../models/user";

export const findAllUsers = async () => {
    const filter = {
        isAdmin: {$ne: true} // $ne means not equal
    };
    const options = {
        password: 0,
        updatedAt: 0,
        __v: 0
    }
    const users = await User.find(filter, options);
    return users;
};

export const findSingleUser = async (id: string) => {
    const options = {
        password: 0,
        updatedAt: 0,
        __v: 0
    }
    const user = await User.findById({_id: id}, options);
    if(!user) {
        const error = new ApiError(404, "User is not found");
        throw error;
    }
    return user;
};

export const userExist = async (email: string) => {
    const userExist = await User.exists({email: email});
    if (userExist) {
        const error = new ApiError(409, "User account already exists");
        throw error;       
    }
};

export const updateSingleUserById = async (req: Request) => {
    const id = req.params.id;
    const user = await User.findOneAndUpdate({_id: id}, req.body, {new: true});
    if(!user) {
    const error = new ApiError(404, "User is not found");
    throw error;
    }
    return user;
};

export const removeUserById = async (id: string) => {
    const user = await User.findOneAndDelete({_id: id});
    if(!user) {
    const error = new ApiError(404, "User is not found");
    throw error;
    }
};

export const banUserById = async (req: Request) => {
    const id = req.params.id;
    const isBanned = req.body.isBanned;
    const user = await User.findOneAndUpdate({_id: id}, {isBanned: isBanned}, {new: true});
    if(!user) {
        const error = new ApiError(404, "User is not found");
        throw error;
    }
    return user;
};