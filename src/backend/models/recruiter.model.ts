/* eslint-disable func-names */
import type { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { model, models, Schema } from 'mongoose';

import { UserRoles } from '@/backend/constants';
import { softDeletePlugin } from '@/backend/plugins';
import { bcryptService } from '@/backend/services';
import { toInteger } from '@/backend/utils';

const recruiterSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName is Required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'LastName is Required'],
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
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minlength: 6,
      select: false,
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
      enum: [UserRoles.ADMIN, UserRoles.RECRUITER],
      default: UserRoles.RECRUITER,
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

recruiterSchema.plugin(softDeletePlugin);

// Encrypt password using bcrypt
recruiterSchema.pre(
  'save',
  async function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified('password')) return next();
    this.password = await bcryptService.hashPassword(this.password);
    return next();
  }
);

// Compare password using bcrypt
recruiterSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  const isMatch: boolean = await bcryptService.comparePassword(
    enteredPassword,
    this.password
  );
  return isMatch;
};

// Check password is changed or not.
recruiterSchema.pre(
  'save',
  function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = new Date(Date.now() - 1000);
    return next();
  }
);

// If password changed throw error
recruiterSchema.methods.changedPasswordAfter = function (timestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = toInteger(this.passwordChangedAt.getTime() / 1000);
    return timestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

// Generate and hash password token
recruiterSchema.methods.getResetPasswordToken = function () {
  const { resetToken, resetPasswordExpire, resetPasswordToken } =
    bcryptService.getResetPasswordToken();

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire = resetPasswordExpire;
  return resetToken;
};

export default models?.Recruiter! || model('Recruiter', recruiterSchema);
