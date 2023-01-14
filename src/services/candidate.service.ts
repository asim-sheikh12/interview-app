import { ApiVersions, CANDIDATE } from '../constants';
import { apiService } from './api.service';

interface IResponse extends Response {
  data: { userId: string; token: string; role: string; expiresIn: number };
  message: string;
}

/** ********************* CANDIDATE SERVICES START ************************ */

/**
 * @description Register Candidate
 * @param {}
 * @return userId: string; token: string; expiresIn: number
 * @url /auth/login
 * @method POST
 */

export const registerCandidate = (data: any): Promise<IResponse> => {
  return apiService.post<IResponse, object>(
    CANDIDATE.REGISTER,
    data,
    ApiVersions.V1
  );
};

/** ********************* CANDIDATE SERVICES END ************************ */
