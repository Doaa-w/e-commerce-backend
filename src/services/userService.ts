import User from "../models/user";

export const findAllUsers = async () => {
    const users = await User.find();
    return users;
}