import * as Koa from 'koa';
import * as log4js from 'log4js';
import {LOG_CFG, LOG_LEVEL} from '../config';
import {logLevelEnum} from '../enums';

export function addLogger(app :Koa){
  app.use(async (ctx: Koa.Context, next: Function) => {
    if(LOG_LEVEL === logLevelEnum.noLog){
      return next();
    }

    const start =  Date.now();
    let ms = 0;
    try {
      await next();
      if(LOG_LEVEL === logLevelEnum.normal){
        ms = Date.now() - start;
        resLog(ctx, ms);
      }
    } catch (e) {
      ms = Date.now() - start;
      errorLog(ctx, e, ms);
    }
  });

}

log4js.configure(LOG_CFG);
const errLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

//error logger api
export function errorLog(ctx :Koa.Context, e: Error, resTime: Number) {
  if (ctx) {
    errLogger.error(formatError(ctx, e, resTime));
  }
}

//response logger api
export function resLog(ctx: Koa.Context, resTime: Number) {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
}

const formatRes = function(ctx: Koa.Context, resTime: Number) {
  return `
    *************** response log start ***************
      ${formatReqLog(ctx.request, resTime)}
      response status: ${ctx.status}
      response body: ${JSON.stringify(ctx.body)}
    *************** response log end *****************
  `;
};

const formatError = function(ctx: Koa.Context, err: Error, resTime: Number) {
  return `
    *************** error log start ***************
      ${formatReqLog(ctx.request, resTime)}
      err name: ${err.name}
      err message: ${err.message}
      err stack: ${err.stack}
    *************** error log end *****************
  `;
};

const formatReqLog = function(req: Koa.Request, resTime: Number) {

  let logText = '';

  const method = req.method;
  logText += "request method: " + method + "\n";
  logText += "request originalUrl:  " + req.originalUrl + "\n";
  logText += "request client ip:  " + req.ip + "\n";
  if (method === 'GET') {
    logText += "request query:  " + JSON.stringify(req.query) + "\n";
  } else {
    logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
  }
  logText += "response time: " + resTime + "\n";

  return logText;
};
