import nextConnect from 'next-connect';

import { checkRoleMiddleware, connect, errorMiddleware } from '@/backend';
import { getAllRecuiter } from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.get(checkRoleMiddleware, getAllRecuiter);

export default router;
