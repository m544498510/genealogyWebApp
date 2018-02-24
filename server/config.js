const path = require('path');

//port number
const port = 8080;
//db config
const dbConfig = {};

//log config
const errLogPath = path.resolve(__dirname, "./logs/error/log");
const respLogPath = path.resolve(__dirname, "./logs/response/log");
const logCfg = {
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

module.exports.PORT = port;
module.exports.DB_CFG = dbConfig;
module.exports.LOG_CFG = logCfg;
