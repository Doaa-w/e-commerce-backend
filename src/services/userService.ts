import { Request } from "express";

import ApiError from "../errors/ApiError";
import User from "../models/userSchema";

export const findAllUsers = async () => {
    const filter = {
        isAdmin: { $ne: true } // isAdmin != true
    };
    const options = {
        password: 0,
        updatedAt: 0,
        __v: 0
    }
    const users = await User.find(filter, options).populate('order').sort({first_name: 1});
    return users;
};

export const findSingleUser = async (id: string) => {
    const options = {
        password: 0,
        updatedAt: 0,
        __v: 0
    }
    const user = await User.findById({ _id: id }, options);
    if(!user) {
        throw new ApiError(404, "User is not found");
    }
    return user;
};

export const isUserExist = async (email: string) => {
    const isUserExist = await User.exists({ email: email });
    if (isUserExist) {
        throw new ApiError(409, "User account already exists");
    }
};

export const isTokenExist = async (token: string) => {
    if (!token) {
        throw new ApiError(404, "Please provide a token");
    }
};

export const updateSingleUser = async (req: Request) => {
    const id = req.params.id;
    const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if(!user) {
    throw new ApiError(404, "User is not found");
    }
    return user;
};

export const removeUser = async (id: string) => {
    const user = await User.findOneAndDelete({ _id: id });
    if(!user) {
    throw new ApiError(404, "User is not found");
    }
};

export const updateBanStatus = async (id: string, isBanned: boolean) => {
    const user = await User.findByIdAndUpdate(id , { isBanned }, { new: true });
    if(!user) {
        throw new ApiError(404, "User is not found");
    }
    return user;
};