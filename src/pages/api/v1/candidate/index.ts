import nextConnect from 'next-connect';

import { authMiddleware, connect, errorMiddleware } from '@/backend';
import { getAllUsers } from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.get(authMiddleware, getAllUsers);

export default router;
