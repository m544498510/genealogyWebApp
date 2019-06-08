import path from 'path';
import {envEnum, logLevelEnum} from './enums';

//port number
export const PORT = 8080;
//db config
export const DB_CFG = {
  url: 'mongodb://localhost/myZone'
};

export const apiPrefix = {
  api: '/api',
  graphql: '/graphql',
  session: '/session',
  public: '/public',
};

//log config
const errLogPath = path.resolve(__dirname, "../bin/runningData/logs/error/date");
const respLogPath = path.resolve(__dirname, "../bin/runningData/logs/response/date");

export const LOG_LEVEL:logLevelEnum = process.env.NODE_ENV === envEnum.production ? logLevelEnum.onlyErr : logLevelEnum.normal;
export const LOG_CFG = {
  appenders: {
    errorLogger: {
      "type": "dateFile",
      "filename": errLogPath,
      "alwaysIncludePattern": true,
      "pattern": "yyyy-MM-dd-hh.err.log"
    },
    resLogger: {
      "type": "dateFile",
      "filename": respLogPath,
      "alwaysIncludePattern": true,
      "pattern": "yyyy-MM-dd-hh.log"
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


