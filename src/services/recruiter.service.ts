/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IData, IUser, Request } from '@/interfaces';

import { ApiVersions, RECRUITER } from '../constants';
import { apiService } from './api.service';

/** ********************* RECRUITER SERVICES START ************************ */

/**
 * @description Add new candidate
 * @param {}
 * @return IUser[]
 * @url /candidate
 * @method POST
 */

export const addCandidate = (data: IUser): Promise<IUser[]> => {
  return apiService.post<IUser[], object>(
    RECRUITER.ACTIONS,
    data,
    ApiVersions.V1
  );
};

/**
 * @description Get all recruiters
 * @param {}
 * @return IUser[]
 * @url /candidate
 * @method GET
 */

export const getAllCandidates = (req?: Request): Promise<IData<IUser[]>> => {
  return apiService.get<IData<IUser[]>, object>(
    RECRUITER.ACTIONS,
    ApiVersions.V1,
    req
  );
};

/**
 * @description Get candidate by id
 * @param id
 * @return IUser[]
 * @url /candidate/id
 * @method GET
 */

export const getCandidateById = (id: string): Promise<IData<IUser[]>> => {
  return apiService.get<IData<IUser[]>, object>(
    `${RECRUITER.ACTIONS}/${id}`,
    ApiVersions.V1
  );
};

/**
 * @description Update candidate
 * @param id
 * @return IUser[]
 * @url /candidate/id
 * @method PATCH
 */

export const updateCandidate = (id: string, data: IUser): Promise<IUser[]> => {
  return apiService.patch<IUser[], object>(
    `${RECRUITER.ACTIONS}/${id}`,
    data,
    ApiVersions.V1
  );
};

/**
 * @description Delte candidate by id
 * @param id
 * @return acknowledged: boolean; deletedCount: number
 * @url /candidate/id
 * @method DELETE
 */

export const deleteCandidate = (
  id: string
): Promise<{
  acknowledged: boolean;
  deletedCount: number;
}> => {
  return apiService.delete<
    { acknowledged: boolean; deletedCount: number },
    object
  >(`${RECRUITER.ACTIONS}/${id}`, ApiVersions.V1);
};

/** ********************* RECRUITER SERVICES END ************************ */
