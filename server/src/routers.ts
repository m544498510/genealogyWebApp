import * as Router from 'koa-router';
import userRouter from './modules/test';

const router = Router();
router.use('/user',userRouter.routes());

export default router;
