import {Context} from "koa";
import Router from 'koa-router';
import sessionRouter from './user/sessionRouter';
import userRouter from './user/userRouter';

const router = new Router<any, Context>({
  prefix: '/api'
});
router.use(sessionRouter.routes(), sessionRouter.allowedMethods());
router.use(userRouter.routes(), userRouter.allowedMethods());

export default router;
