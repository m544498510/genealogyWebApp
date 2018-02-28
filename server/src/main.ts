import * as path from 'path';
import * as Koa from 'koa';

import * as Router from 'koa-router';
import * as convert from 'koa-convert';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import * as staticTool from 'koa-static';

import {errorLog, resLog} from './utils/log';
import {PORT} from './config';

import api from './routers';

const app = new Koa();

app.use(convert(bodyParser()));
app.use(convert(json()));

//add the static server
const publicPath = path.resolve(__dirname, '../public');
app.use(convert(staticTool(publicPath)));

//add the logger
app.use(async (ctx: Object, next: Function) => {
  const start = (new Date()).getDate();
  let ms = 0;
  try {
    await next();
    ms = (new Date()).getDate() - start;
    resLog(ctx, ms);
  } catch (e) {
    ms = (new Date()).getDate() - start;
    errorLog(ctx, e, ms);
  }
});

const router = new Router();
router.use('/api', api.routes());
app.use(router.routes());

app.listen(PORT);
