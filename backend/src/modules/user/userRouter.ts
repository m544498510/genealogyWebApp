import {Context} from 'koa';
import Router from 'koa-router';
import {createUser} from './service';
import * as responseUtils from '../../utils/responseUtils';
import HttpError from '../../utils/HttpError';

const router = new Router<any, Context>({
  prefix: '/user'
});

router.post('/', async ctx => {
  const param = ctx.request.body;
  const user = await createUser(param.name, param.password, param.nikeName);
  if(user){
    responseUtils.success(ctx, user);
  } else {
    const e =  new HttpError('400', "something wrong");
    responseUtils.error(ctx, e);
  }
});

export default router;
