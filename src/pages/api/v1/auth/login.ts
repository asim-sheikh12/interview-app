import nextConnect from 'next-connect';

import { connect, errorMiddleware } from '@/backend';
import { loginUser } from '@/backend/controller';

// Connect database
connect();

const router = nextConnect(errorMiddleware);

router.post(loginUser);

export default router;
