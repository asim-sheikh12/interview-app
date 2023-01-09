// const basePath = `${
//   process.env.NEXT_PUBLIC_BASE_PATH ? process.env.NEXT_PUBLIC_BASE_PATH : ''
// }/icons/`;
import backgroundImg from '../assets/images/background.jpg';
import logoIcon from '../assets/images/Logo.svg';

export const icons = {
  logoIcon,
  backgroundImg,
};

export const favIcons = `${process.env.NEXT_PUBLIC_BASE_PATH}/favicons`;

export const enum ApiVersions {
  V1 = 'V1',
  MOCK = 'MOCK',
}
export const enum UserRole {
  ADMIN = 'admin',
  RECRUITER = 'recruiter',
}

export const enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
