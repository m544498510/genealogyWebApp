import {Context} from "koa";
import Router from 'koa-router';
import sessionRouter from './user/sessionRouter';

const router = new Router<any, Context>();
router.use('/user',sessionRouter.routes());

export default router;
