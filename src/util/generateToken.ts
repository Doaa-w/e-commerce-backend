import jwt from 'jsonwebtoken';

import { dev } from '../config';
import { UserInputType } from '../types/user';

export const generateToken = (tokenPayload: UserInputType | string) => {
    jwt.sign(tokenPayload, dev.app.jwtUserActivationKey, { expiresIn: '30m' });
};