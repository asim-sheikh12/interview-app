import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpStatus } from '@/backend/constants';
import { BadRequestException, ConflictException } from '@/backend/exceptions';
import type { IRecruiter, IUser, TokenData } from '@/backend/interfaces';
import { asyncHandler } from '@/backend/middlewares';
import { recruiterRepository, userRepository } from '@/backend/repositories';

import { bcryptService } from '../services';
import { jwtService } from '../services/jwt.service';

/**
 * @description Create new user with user type.
 * @url /register
 * @param {IUser} user
 * @access Public
 */
export const registerUser = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { firstName, lastName, phoneNumber, email } = req.body as IUser;

    const foundUser: IUser = await userRepository.findOne({ email }, ['_id']);
    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    const user: IUser = await userRepository.create({
      firstName,
      lastName,
      phoneNumber,
      email,
    });

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      message: 'Registration Successfull',
      data: user,
    });
  }
);
/**
 * @description Login user with user type.
 * @url /login
 * @param {IRecruiter} recruiter
 * @access Public
 */
export const loginUser = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body as IRecruiter;

    const foundUser: IRecruiter = await recruiterRepository.findOne({ email }, [
      '_id',
      'password',
      'role',
    ]);
    if (!foundUser) {
      throw new BadRequestException('Invalid Email');
    }

    const isPasswordMatching: boolean = await bcryptService.comparePassword(
      password.toString(),
      foundUser.password
    );
    if (!isPasswordMatching) {
      throw new ConflictException('Invalid credentials');
    }
    const tokenData: TokenData = jwtService.createToken(foundUser);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Login Successfull',
      data: { userId: foundUser._id, ...tokenData },
    });
  }
);
