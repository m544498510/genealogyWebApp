import * as path from 'path';

//port number
export const PORT = 8080;
//db config
export const DB_CFG = {};

//log config
const errLogPath = path.resolve(__dirname, "./logs/error/log");
const respLogPath = path.resolve(__dirname, "./logs/response/log");
export const LOG_CFG = {
  appenders: {
    errorLogger: {
      "type": "dateFile",
      "filename": errLogPath,
      "alwaysIncludePattern": true,
      "pattern": "-yyyy-MM-dd-hh.log"
    },
    resLogger: {
      "type": "dateFile",
      "filename": respLogPath,
      "alwaysIncludePattern": true,
      "pattern": "-yyyy-MM-dd-hh.log"
    }
  },
  categories:{
    default: {
      appenders: ['resLogger'],
      level: 'ALL'
    },
    error: {
      appenders:['errorLogger'],
      level: 'ERROR'
    },
  }
};


