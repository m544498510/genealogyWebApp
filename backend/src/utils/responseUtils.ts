import { Context } from "koa";
import HttpError from './HttpError';

export function error(ctx: Context, e: Error, httpStatus = 400) {
  if(!(e instanceof HttpError)){
    e = new HttpError('400', e.message);
  }
  ctx.body = e;
  ctx.status = httpStatus;
}

export function success(ctx: Context, data?: any) {
  ctx.body = data;
  ctx.status = 200;
}
