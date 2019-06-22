import {Context} from "koa";
import Router from 'koa-router';
import sessionRouter from './user/sessionRouter';
import pageRouter from './page/router';

const router = new Router<any, Context>();
router.use('/user',sessionRouter.routes(), sessionRouter.allowedMethods());
router.use(pageRouter.routes(), pageRouter.allowedMethods());

export default router;
