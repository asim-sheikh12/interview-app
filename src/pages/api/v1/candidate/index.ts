import nextConnect from 'next-connect';

import { authMiddleware, connect, errorMiddleware } from '@/backend';
import { getAllUsers, sendEmailToUser } from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.get(authMiddleware, getAllUsers);
router.post(authMiddleware, sendEmailToUser);

export default router;
