import * as log4js from 'log4js';
import {LOG_CFG} from '../config';

log4js.configure(LOG_CFG);

const errLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

//error logger api
export function errorLog(ctx, e, resTime) {
  if (ctx) {
    errLogger.error(formatError(ctx, e, resTime));
  }
}

//response logger api
export function resLog(ctx, resTime) {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
}

const formatRes = function(ctx, resTime) {
  return `
    *************** response log start ***************
      ${formatReqLog(ctx.request, resTime)}
      response status: ${ctx.status}
      response body: ${JSON.stringify(ctx.body)}
    *************** response log end *****************
  `;
};

const formatError = function(ctx, err, resTime) {
  return `
    *************** error log start ***************
      ${formatReqLog(ctx.request, resTime)}
      err name: ${err.name}
      err message: ${err.message}
      err stack: ${err.stack}
    *************** error log end *****************
  `;
};

const formatReqLog = function(req, resTime) {

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
