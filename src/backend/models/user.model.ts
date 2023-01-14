/* eslint-disable func-names */
import { model, models, Schema } from 'mongoose';

import { CandidateStatus, UserRoles } from '@/backend/constants';
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
    currentCompany: {
      type: String,
      required: [true, 'Company is Required'],
    },
    experience: {
      type: String,
      required: [true, 'Experience is Required'],
    },
    currentCTC: {
      type: String,
      required: [true, 'Current ctc is Required'],
    },
    expectedCTC: {
      type: String,
      required: [true, 'Expected ctc is Required'],
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
    isSelected: {
      type: String,
      enum: [
        CandidateStatus.SELECTED,
        CandidateStatus.ON_HOLD,
        CandidateStatus.REJECTED,
      ],
      default: CandidateStatus.ON_HOLD,
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
