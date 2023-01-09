import multer from 'multer';

import cloudinary from '../services/cloudinary.service';

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const fileFilter = (req: any, file: any, cb: any): void => {
  console.log('🚀 ~ file: multer.middleware.ts:8 ~ fileFilter ~ req', req);

  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Images',
  },
});
export const fileUpload = multer({ storage, fileFilter }).single('photo');
