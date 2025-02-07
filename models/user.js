import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    lastlogin: {
      type: Date,
      default: new Date.now(),
    },
  },
  { versionKey: '_v1' },
);

const User = mongoose.model('User', UserSchema);

export default User;
