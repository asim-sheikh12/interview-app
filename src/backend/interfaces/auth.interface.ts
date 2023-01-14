import type { IRecruiter } from './user.interface';

export interface DataStoredInToken {
  _id: string;
  role?: string;
  email?: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: IRecruiter;
}
