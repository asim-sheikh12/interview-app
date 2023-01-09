import type { IEndpointProvider, IMethod, Request } from '@/interfaces';
import { AppConfig, getCookie } from '@/utils';

import { ApiVersions, HttpMethods } from '../constants';

export const queryOf = (params: Record<string, string> = {}): string => {
  return new URLSearchParams(params).toString();
};
export const isJson = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
const callApi = async <T, K>(
  method: IMethod,
  url: string,
  payload: K | null,
  base: IEndpointProvider,
  req: Request | null
): Promise<T> => {
  let baseURL = '';
  switch (base) {
    case ApiVersions.V1:
      baseURL = process.env.NEXT_PUBLIC_BASE_URL!;
      break;
    case ApiVersions.MOCK:
      baseURL = process.env.NEXT_PUBLIC_MOCK_API!;
      break;
    default:
      break;
  }
  const api = `${baseURL}${url}`;
  const headers: { [x: string]: string } = {
    'Content-Type': 'application/json',
  };
  const token = getCookie(AppConfig.tokenKey, req);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const options: RequestInit = {
    method: method || HttpMethods.GET,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  if (
    [HttpMethods.POST, HttpMethods.PUT, HttpMethods.PATCH].includes(
      method as HttpMethods
    )
  ) {
    options.body = JSON.stringify(payload ?? {});
  }
  const response: Response = await fetch(api, options);
  if (!response?.ok) {
    const text = await response.text();
    return (JSON.parse(text) ?? text) as T;
  }
  return response.json();
};
export const apiService = {
  get: <T, K = {}>(
    url: string,
    base: IEndpointProvider = ApiVersions.V1,
    req?: Request
  ) => callApi<T, K>('GET', url, null, base, req ?? null),

  post: <T, K>(
    url: string,
    payload: K,
    base: IEndpointProvider = ApiVersions.V1,
    req?: Request
  ) => callApi<T, K>('POST', url, payload, base, req ?? null),

  patch: <T, K = Record<string, string | number>>(
    url: string,
    payload: K,
    base: IEndpointProvider = ApiVersions.V1,
    req?: Request
  ) => callApi<T, K>('PATCH', url, payload, base, req ?? null),

  put: <T, K = Record<string, string | number>>(
    url: string,
    payload: K,
    base: IEndpointProvider = ApiVersions.V1,
    req?: Request
  ) => callApi<T, K>(HttpMethods.PUT, url, payload, base, req ?? null),

  delete: <T, K = {}>(url: string, base: IEndpointProvider = ApiVersions.V1) =>
    callApi<T, K>(HttpMethods.DELETE, url, null, base, null),
};
