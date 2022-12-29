import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpMessage, HttpStatus, UserRoles } from '../constants';
import { UnauthorizedException } from '../exceptions';
import { recruiterRepository } from '../repositories';
import { jwtService } from '../services/jwt.service';
import { asyncHandler } from './async-handler.middleware';

// @desc   Verify Token Middleware
export const authMiddleware = asyncHandler(
  async (req: NextApiRequest, _res: NextApiResponse, next: any) => {
    // 1) Getting token and check of it's there
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
      // eslint-disable-next-line prefer-destructuring
      token = authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new UnauthorizedException(
        HttpMessage.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED
      );
    }

    // 2) Verification token
    const decoded: any = await jwtService.verifyToken(token);
    if (!decoded || !decoded._id) {
      throw new UnauthorizedException(
        HttpMessage.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED
      );
    }

    // 3) Check if user still exists
    const currentUser: any = await recruiterRepository.findOne(decoded.id);

    if (!currentUser) {
      throw new UnauthorizedException(
        HttpMessage.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED
      );
    }
    return next();
  }
);

// @desc   Verify Token Middleware
export const checkRoleMiddleware = asyncHandler(
  async (req: NextApiRequest, _res: NextApiResponse, next: any) => {
    // 1) Getting token and check of it's there
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
      // eslint-disable-next-line prefer-destructuring
      token = authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new UnauthorizedException(
        HttpMessage.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED
      );
    }

    // 2) Verification token
    const decoded: any = await jwtService.verifyToken(token);
    if (decoded.role !== UserRoles.ADMIN) {
      throw new UnauthorizedException(
        HttpMessage.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED
      );
    }

    // 3) Check if user still exists
    const currentUser: any = await recruiterRepository.findOne(decoded.id);
    if (!currentUser) {
      throw new UnauthorizedException(
        HttpMessage.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED
      );
    }
    return next();
  }
);
