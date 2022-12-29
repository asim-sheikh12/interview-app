import nextConnect from 'next-connect';

import { checkRoleMiddleware, connect, errorMiddleware } from '@/backend';
import {
  deleteRecruiter,
  getRecruiterById,
  updateRecruiter,
} from '@/backend/controller/recruiter.controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.get(checkRoleMiddleware, getRecruiterById);
router.delete(checkRoleMiddleware, deleteRecruiter);
router.patch(checkRoleMiddleware, updateRecruiter);
export default router;
