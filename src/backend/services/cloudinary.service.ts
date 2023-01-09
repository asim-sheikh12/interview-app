import { config } from '../config';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUD_NAME,
  api_key: config.CLOUDINARY.CLOUD_API_KEY,
  api_secret: config.CLOUDINARY.CLOUD_API_SECRET,
  secure: config.CLOUDINARY.CLOUD_SECURE,
});

export default cloudinary;
