import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

import { user } from '../types';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "user's first name must be at least 2 characters"],
    maxlength: [50, "user's first name must be at most 50 characters"]
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "user's last name must be at least 2 characters"],
    maxlength: [50, "user's last name must be at most 50 characters"]
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "password must be at least 6 characters"],
    set: (password: string) => bcrypt.hashSync(password, 10)
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    minlength: [3, "address must be at least 3 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  // order: {
  // },
},
{ timestamps: true }
);

export default mongoose.model<user>('User', userSchema);