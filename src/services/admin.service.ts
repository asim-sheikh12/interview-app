/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IData, IRecruiter, IUser, Request } from '@/interfaces';

import { ADMIN, ApiVersions } from '../constants';
import { apiService } from './api.service';

/** ********************* ADMIN SERVICES START ************************ */

/**
 * @description Add new recruiter
 * @param {}
 * @return IRecruiter[]
 * @url /recruiter
 * @method POST
 */

export const addRecruiter = (data: IUser): Promise<IRecruiter[]> => {
  return apiService.post<IRecruiter[], object>(
    ADMIN.ADD_RECRUITER,
    data,
    ApiVersions.V1
  );
};

/**
 * @description Get all recruiters
 * @param {}
 * @return IRecruiter[]
 * @url /recruiter
 * @method GET
 */

export const getAllRecruiters = (
  req?: Request
): Promise<IData<IRecruiter[]>> => {
  return apiService.get<IData<IRecruiter[]>, object>(
    ADMIN.ACTIONS,
    ApiVersions.V1,
    req
  );
};

/**
 * @description Get recruiter by id
 * @param id
 * @return IRecruiter[]
 * @url /recruiter/id
 * @method GET
 */

export const getRecruiterById = (id: string): Promise<IData<IRecruiter[]>> => {
  return apiService.get<IData<IRecruiter[]>, object>(
    `${ADMIN.ACTIONS}/${id}`,
    ApiVersions.V1
  );
};

/**
 * @description Update recruiter
 * @param id
 * @return IRecruiter[]
 * @url /recruiter/id
 * @method PATCH
 */

export const updateRecruiter = (
  id: string,
  data: IUser
): Promise<IRecruiter[]> => {
  return apiService.patch<IRecruiter[], object>(
    `${ADMIN.ACTIONS}/${id}`,
    data,
    ApiVersions.V1
  );
};

/**
 * @description Delte recruiter by id
 * @param id
 * @return acknowledged: boolean; deletedCount: number
 * @url /recruiter/id
 * @method DELETE
 */

export const deleteRecruiter = (
  id: string
): Promise<{
  acknowledged: boolean;
  deletedCount: number;
}> => {
  return apiService.delete<
    { acknowledged: boolean; deletedCount: number },
    object
  >(`${ADMIN.ACTIONS}/${id}`, ApiVersions.V1);
};

/** ********************* ADMIN SERVICES END ************************ */
