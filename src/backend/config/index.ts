import { NodeEnv } from '../constants';
import { getOsEnv, toNumber } from '../utils';

export const config = {
  isProduction: getOsEnv('NODE_ENV') === NodeEnv.PRODUCTION,
  isDevelopment: getOsEnv('NODE_ENV') === NodeEnv.DEVELOPMENT,
  DB: {
    MONGO_URI: getOsEnv('MONGO_URI'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  JWT: {
    EXPIRES_IN: getOsEnv('JWT_EXPIRES_IN'),
    JWT_SECRET: getOsEnv('JWT_SECRET'),
  },
  CLOUDINARY: {
    CLOUD_NAME: getOsEnv('CLOUD_NAME'),
    CLOUD_API_KEY: getOsEnv('CLOUD_API_KEY'),
    CLOUD_API_SECRET: getOsEnv('CLOUD_API_SECRET'),
    CLOUD_SECURE: getOsEnv('CLOUD_SECURE'),
  },
  HASH_SALT: toNumber(getOsEnv('HASH_SALT')),
  CRYPTO_ROUNDS: toNumber(getOsEnv('CRYPTO_ROUNDS')),
};
