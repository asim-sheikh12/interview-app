/* eslint-disable func-names */
import { model, models, Schema } from 'mongoose';

import { UserRoles } from '@/backend/constants';
import { softDeletePlugin } from '@/backend/plugins';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName is Required'],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Contact Number is Required'],
      unique: true,
    },
    photo: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: UserRoles.USER,
    },
  },
  { timestamps: true }
);

userSchema.plugin(softDeletePlugin);

export default models?.User! || model('User', userSchema);
