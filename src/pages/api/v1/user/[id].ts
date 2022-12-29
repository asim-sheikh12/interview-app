import nextConnect from 'next-connect';

import { authMiddleware, connect, errorMiddleware } from '@/backend';
import { deleteUser, getUserById, updateUser } from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.get(authMiddleware, getUserById);
router.delete(authMiddleware, deleteUser);
router.patch(authMiddleware, updateUser);
export default router;
