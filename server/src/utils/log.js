const log4js = require('log4js');
const {LOG_CFG} = require('../../config');

log4js.configure(LOG_CFG);

const errLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

//error logger api
function errorLog(ctx, resTime) {
  if (ctx) {
    errLogger.error(formatError(ctx, resTime));
  }
}

//response logger api
function resLog(ctx, resTime) {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
}

const formatRes = function(ctx, resTime) {
  let logText = '';
  
  logText += "\n" + "*************** response log start ***************" + "\n";
  logText += formatReqLog(ctx.request, resTime);
  logText += "response status: " + ctx.status + "\n";
  logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";
  logText += "*************** response log end ***************" + "\n";
  
  return logText;
  
};

const formatError = function(ctx, err, resTime) {
  let logText = '';
  
  logText += "\n" + "*************** error log start ***************" + "\n";
  logText += formatReqLog(ctx.request, resTime);
  logText += "err name: " + err.name + "\n";
  logText += "err message: " + err.message + "\n";
  logText += "err stack: " + err.stack + "\n";
  logText += "*************** error log end ***************" + "\n";
  
  return logText;
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

module.exports.error = errorLog;
module.exports.response = resLog;
