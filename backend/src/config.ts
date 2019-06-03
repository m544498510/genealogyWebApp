import path from 'path';
import {logLevelEnum} from './enums';

//port number
export const PORT = 8080;
//db config
export const DB_CFG = {
  url: 'mongodb://localhost/myZone'
};

//log config
const errLogPath = path.resolve(__dirname, "../bin/runningData/logs/error/log");
const respLogPath = path.resolve(__dirname, "../bin/runningData/logs/response/log");

export const LOG_LEVEL:logLevelEnum = logLevelEnum.onlyErr;
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


