import nextConnect from 'next-connect';

import { connect, errorMiddleware } from '@/backend';
import { getUserByEmail } from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.get(getUserByEmail);

export default router;
