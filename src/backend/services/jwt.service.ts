import type { JwtPayload } from 'jsonwebtoken';
import { sign, verify } from 'jsonwebtoken';

import { config } from '../config';
import type { DataStoredInToken, IRecruiter, TokenData } from '../interfaces';

export class JwtService {
  createToken(user: IRecruiter): TokenData {
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
      role: user.role,
    };
    const secretKey: string = config.JWT.JWT_SECRET;
    const expiresIn: number = 60 * 60;

    return {
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
      expiresIn,
    };
  }

  verifyToken = async (token: string): Promise<string | JwtPayload> => {
    const decoded = await verify(token, config.JWT.JWT_SECRET);
    return decoded;
  };

  signToken = (id: string): string => {
    const token = sign({ id }, config.JWT.JWT_SECRET, {
      expiresIn: config.JWT.EXPIRES_IN,
      algorithm: 'RS256',
    });

    return token;
  };
}
export const jwtService = new JwtService();
