import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpStatus, UserRoles } from '@/backend/constants';
import { BadRequestException } from '@/backend/exceptions';
import type { IRecruiter } from '@/backend/interfaces';
import { asyncHandler } from '@/backend/middlewares';
import { recruiterRepository } from '@/backend/repositories';

interface MulterRequest extends NextApiRequest {
  file: any;
}

/**
 * @description Add new recruiter.
 * @url /recruiter
 * @param {IRecruiter} recruiter
 * @access Private
 */
export const addRecruiter = asyncHandler(
  async (req: MulterRequest, res: NextApiResponse) => {
    console.log(req.body, req.file);
    const photo = req?.file?.path;
    const { firstName, lastName, phoneNumber, email } = req.body as IRecruiter;

    const foundUser: IRecruiter = await recruiterRepository.findOne({ email }, [
      '_id',
    ]);
    if (foundUser) {
      throw new BadRequestException('Recruiter already exists');
    }

    const recruiter: IRecruiter = await recruiterRepository.create({
      firstName,
      lastName,
      password: `${firstName?.slice(0, 3)?.toLowerCase()}@12345`,
      photo,
      phoneNumber,
      email,
    });

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      message: 'Recruiter added successfully',
      data: recruiter,
    });
  }
);

/**
 * @description Get all recruiter.
 * @url /recruiter
 * @param {IRecruiter} recruiter
 * @access Private
 */

export const getAllRecuiter = asyncHandler(
  async (_req: NextApiRequest, res: NextApiResponse) => {
    const result: IRecruiter[] = await recruiterRepository.find({
      role: UserRoles.RECRUITER,
    });
    if (!result) {
      throw new BadRequestException('Recruiters does not exists');
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Recruiters fetched successfully',
      data: result,
    });
  }
);

/**
 * @description Get recruiter by id.
 * @url /recruiter/id
 * @param {IRecruiter} recruiter
 * @access Private
 */

export const getRecruiterById = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const result: IRecruiter = await recruiterRepository.findOne({ _id: id });
    if (!result) {
      throw new BadRequestException('Recruiter does not exists');
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Recruiter fetched successfully',
      data: result,
    });
  }
);

/**
 * @description Delete recruiter.
 * @url /recruiter/id
 * @param {IRecruiter} recruiter
 * @access Private
 */

export const deleteRecruiter = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const result = await recruiterRepository.deleteOne({ _id: id });
    if (!result) {
      throw new BadRequestException('Recruiter does not exists');
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Recruiter deleted successfully',
      data: result,
    });
  }
);

/**
 * @description Update recruiter details.
 * @url /recruiter/id
 * @param {IRecruiter} recruiter
 * @access Private
 */

export const updateRecruiter = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { firstName, lastName, email, phoneNumber, photo } =
      req.body as IRecruiter;
    const user = await recruiterRepository.findOne({ _id: id });
    if (!user) {
      throw new BadRequestException('Recruiter does not exists');
    }
    const result = await recruiterRepository.findOneAndUpdate(
      { _id: id },
      { firstName, lastName, email, phoneNumber, photo }
    );

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Recruiter updated successfully',
      data: result,
    });
  }
);
