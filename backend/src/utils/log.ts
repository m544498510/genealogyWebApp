import Koa, {Context} from 'koa';
import log4js from 'log4js';
import {apiPrefix, LOG_CFG, LOG_LEVEL} from '../config';
import {logLevelEnum} from '../enums';

log4js.configure(LOG_CFG);
const resLogger = log4js.getLogger('default');
const errLogger = log4js.getLogger('error');

export function addLogger(app: Koa) {
  app.use(async (ctx: Koa.Context, next: Function) => {
    if (LOG_LEVEL === logLevelEnum.noLog) {
      return next();
    }

    const start = Date.now();
    let ms = 0;
    try {
      await next();
      //handle the graphql error
      if (ctx.request.url.includes(apiPrefix.graphql)) {
        const errors = JSON.parse(ctx.response.body).errors;
        if (errors && errors.length > 0) {
          ms = Date.now() - start;
          errGraphqlLog(ctx, errors[0], ms);
        }
      } else if (LOG_LEVEL === logLevelEnum.normal) {
        ms = Date.now() - start;
        resLog(ctx, ms);
      }
    } catch (e) {
      ms = Date.now() - start;
      errRequestLog(ctx, e, ms);
    }
  });
}

export function errorLog(msg: String) {
  errLogger.error(`
    *************** error log start ***************
      ${msg}
    *************** error log end *****************
  `)
}

//error logger api
export function errRequestLog(ctx: Koa.Context, e: Error, resTime: Number) {
  if (ctx) {
    errLogger.error(formatError(ctx, e, resTime));
  }
}

type graphqlError = {
  extensions: {
    code: string,
    exception: {
      errors: { message: string }[],
      stacktrace: string[]
    }
  }
}

export function errGraphqlLog(ctx: Context, error: graphqlError, resTime: Number) {
  const extensions = error.extensions;
  const e = {
    name: extensions.code,
    message: extensions.exception.errors[0].message,
    stack: extensions.exception.stacktrace.join('\n')
  };
  errRequestLog(ctx, e, resTime);
}

//response logger api
export function resLog(ctx: Koa.Context, resTime: Number) {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
}

const formatRes = function (ctx: Koa.Context, resTime: Number) {
  return `
    *************** response log start ***************
      ${formatReqLog(ctx.request, resTime)}
      response status: ${ctx.status}
      response body: ${JSON.stringify(ctx.body)}
    *************** response log end *****************
  `;
};

const formatError = function (ctx: Koa.Context, err: Error, resTime: Number) {
  return `
    *************** error log start ***************
      ${formatReqLog(ctx.request, resTime)}
      err name: ${err.name}
      err message: ${err.message}
      err stack: ${err.stack}
    *************** error log end *****************
  `;
};

const formatReqLog = function (req: Koa.Request, resTime: Number) {
  const method = req.method;
  let content;
  if (method === 'GET') {
    content = `query: ${JSON.stringify(req.query)}`;
  } else {
    content = `body: ${JSON.stringify(req.body)}`;
  }
  return `
      request method: ${method}
      request originalUrl: ${req.originalUrl}
      request client ip: ${req.ip}
      request ${content}
      request time: ${resTime}
  `;
};
