import { ADMIN, ApiVersions } from '../constants';
import { apiService } from './api.service';

interface IResponse extends Response {
  data: { userId: string; token: string; role: string; expiresIn: number };
  message: string;
}

/** ********************* AUTH SERVICES START ************************ */

/**
 * @description Login Handler
 * @param {}
 * @return userId: string; token: string; expiresIn: number
 * @url /auth/login
 * @method POST
 */

export const handleLogin = (data: {
  email: string;
  password: string;
}): Promise<IResponse> => {
  return apiService.post<IResponse, object>(ADMIN.LOGIN, data, ApiVersions.V1);
};

export const changePassword = (
  id: string,
  password: string
): Promise<IResponse> => {
  return apiService.patch<IResponse, string>(
    `${ADMIN.ACTIONS}/${id}`,
    password,
    ApiVersions.V1
  );
};
/** ********************* AUTH SERVICES END ************************ */
