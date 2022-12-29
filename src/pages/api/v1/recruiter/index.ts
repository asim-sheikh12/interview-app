import nextConnect from 'next-connect';

import { checkRoleMiddleware, connect, errorMiddleware } from '@/backend';
import { addRecruiter, getAllRecuiter } from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.post(checkRoleMiddleware, addRecruiter);
router.get(checkRoleMiddleware, getAllRecuiter);

export default router;
