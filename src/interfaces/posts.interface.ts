export interface IRecruiter {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  photo: string;
  isVerified: boolean;
  isActive: boolean;
  role: string;
  passwordChangedAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  photo?: string;
  experience?: string;
  currentCompany?: string;
  currentCTC?: string;
  expectedCTC?: string;
}
