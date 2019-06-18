import {Context} from 'koa';
import Router from 'koa-router';
import {getUser} from './service';
import * as responseUtils from '../../utils/responseUtils';
import HttpError from '../../utils/HttpError';

const router = new Router<any, Context>();

router.post('/session', async ctx => {
  try {
    const param = ctx.request.body;
    const user = await getUser(param.name, param.password);

    if (user) {
      if (ctx.session) {
        ctx.session.user = user;
      }
      responseUtils.success(ctx, user);
    } else {
      const e =  new HttpError('401', "user name or password error");
      responseUtils.error(ctx, e);
    }
  } catch (e) {
    responseUtils.error(ctx, e);
  }
});

router.delete('/session', ctx => {
  if (ctx.session) {
    ctx.session.user = null;
  }
  responseUtils.success(ctx, true);
});

export default router;

