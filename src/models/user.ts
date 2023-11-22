import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "user's first name must be at least 2 characters"],
    maxlength: [15, "user's first name must be at most 15 characters"]
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "user's last name must be at least 2 characters"],
    maxlength: [15, "user's last name must be at most 15 characters"]
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "password must be at least 6 characters"],
  },
  // relation between order and user should be many orders to one user
  // here's 1to1 just for the demo
  // order: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Order',
  // },
});

export default mongoose.model('User', userSchema);