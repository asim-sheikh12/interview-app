import { getCookie as getCookieNext } from 'cookies-next';
// import { AES } from 'crypto-js';
import type { IncomingMessage } from 'http';

// import { config } from '@/backend';

type Request = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};
export const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0]!.toUpperCase())
    .join('');

export function getCookie(key: string, req: Request | null): string {
  let cookie = null;
  if (req) {
    cookie = getCookieNext(key, {
      req,
    });
  } else {
    cookie = getCookieNext(key);
  }
  return cookie?.toString() ?? '';
}

export const randomColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff);
  const color = `#${hex.toString(16)}`;

  return color;
};

// export const encodeString = (val: string) => {
//   const encodedString = AES.encrypt(val, config.JWT.JWT_SECRET).toString();
//   return encodedString;
// };
