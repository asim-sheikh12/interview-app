import nextConnect from 'next-connect';

import { authMiddleware, connect, errorMiddleware } from '@/backend';
import {
  deleteUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.get(authMiddleware, getUserById);
router.get(authMiddleware, getUserByEmail);
router.delete(authMiddleware, deleteUser);
router.patch(authMiddleware, updateUser);
export default router;
