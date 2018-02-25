const path = require('path');
const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = new Router();

const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const logUtil = require('./utils/log');

const {PORT} = require('../config');
const publicPath = path.resolve(__dirname, '../public');

const api = require('./routers');


//add the middleware
app.use(convert(bodyParser()));
app.use(convert(json()));
app.use(convert(require('koa-static')(publicPath)));

//add the logger
app.use(async (ctx, next) => {
  const start = new Date();
  let ms = 0;
  try {
    await next();
    ms = new Date() - start;
    logUtil.response(ctx, ms);
  } catch (e) {
    ms = new Date() - start;
    logUtil.error(ctx, ms);
  }
});

router.use('/api', api.routes(), api.allowedMethods());
app
  .use(router.routes())
  .use(router.allowedMethods());

try {
  app.listen(PORT);
  console.log(`Start the server in the "http://localhost:${PORT}/"`);
  
} catch (e) {
  console.error(e);
}

