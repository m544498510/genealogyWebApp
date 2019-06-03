import Router from 'koa-router';
import userRouter from './modules/test';

const router = new Router();
router.use('/user',userRouter.routes());

export default router;
