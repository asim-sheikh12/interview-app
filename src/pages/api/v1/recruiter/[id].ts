import nextConnect from 'next-connect';

import {
  authMiddleware,
  checkRoleMiddleware,
  connect,
  errorMiddleware,
} from '@/backend';
import {
  deleteRecruiter,
  getRecruiterById,
  updateRecruiter,
} from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.get(authMiddleware, getRecruiterById);
router.delete(checkRoleMiddleware, deleteRecruiter);
router.patch(authMiddleware, updateRecruiter);

export default router;
