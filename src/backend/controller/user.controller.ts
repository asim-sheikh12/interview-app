import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpStatus } from '@/backend/constants';
import { BadRequestException } from '@/backend/exceptions';
import type { IUser } from '@/backend/interfaces';
import { asyncHandler } from '@/backend/middlewares';
import { userRepository } from '@/backend/repositories';

/**
 * @description Get all user.
 * @url /user
 * @param {IUser} user
 * @access Private
 */

export const getAllUsers = asyncHandler(
  async (_req: NextApiRequest, res: NextApiResponse) => {
    const result: IUser[] = await userRepository.findAll();
    if (!result) {
      throw new BadRequestException('Users does not exists');
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Users fetched successfully',
      data: result,
    });
  }
);

/**
 * @description Get user by id.
 * @url /user/id
 * @param {IUser} user
 * @access Private
 */

export const getUserById = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const result: IUser = await userRepository.findOne({ _id: id });
    if (!result) {
      throw new BadRequestException('User does not exists');
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'User fetched successfully',
      data: result,
    });
  }
);

/**
 * @description Delete user.
 * @url /user/id
 * @param {IUser} user
 * @access Private
 */

export const deleteUser = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const result = await userRepository.deleteOne({ _id: id });
    if (!result) {
      throw new BadRequestException('User does not exists');
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'User deleted successfully',
      data: result,
    });
  }
);

/**
 * @description Update user details.
 * @url /user/id
 * @param {IUser} user
 * @access Private
 */

export const updateUser = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { firstName, lastName, email, phoneNumber, photo } =
      req.body as IUser;
    const result = await userRepository.findOneAndUpdate(
      { _id: id },
      { firstName, lastName, email, phoneNumber, photo }
    );
    if (!result) {
      throw new BadRequestException('User does not exists');
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'User updated successfully',
      data: result,
    });
  }
);
