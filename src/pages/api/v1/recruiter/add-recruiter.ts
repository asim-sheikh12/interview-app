import nextConnect from 'next-connect';

import {
  checkRoleMiddleware,
  connect,
  errorMiddleware,
  fileUpload,
} from '@/backend';
import { addRecruiter } from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.post(checkRoleMiddleware, fileUpload, addRecruiter);

export default router;

export const config = {
  api: {
    bodyParser: false,
    // externalResolver: true,
  },
};
