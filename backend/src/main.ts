import path from 'path';

import Koa from 'koa';
import Router from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import staticTool from 'koa-static';
import {ApolloServer} from 'apollo-server-koa';
import session from 'koa-session';
import mount from 'koa-mount';

import mongoose from 'mongoose';

import {addLogger, errorLog} from './utils/log';
import {DB_CFG, PORT, apiPrefix} from './config';

import api from './modules/routers';
import schema from './modules/schema';
import {getUserInfo} from './utils/sessionUtils';

const app = new Koa();

//add the static server
const publicPath = path.resolve(__dirname, '../public');
app.use(mount('/public', staticTool(publicPath)));

//add the logger
addLogger(app);

//init session middleware
app.use(session({
  key: 'sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 1800000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false,
  /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}, app));

app.use(bodyParser());
app.use(json());

// auth
app.use(async (ctx: Koa.Context, next: Function) => {
  //session filter
  const url = ctx.request.url;
  if(url.includes(apiPrefix.api) || url.includes(apiPrefix.graphql)){
    if (url.includes(apiPrefix.session) || getUserInfo(ctx) || true) {
      await next();
    } else {
      ctx.response.status = 401;
    }
  }else{
    //pass the page request
    next();
  }
});

const apolloServer = new ApolloServer({
  schema,
  context: (req) => (req)
});
apolloServer.applyMiddleware({app, path: apiPrefix.graphql});

//restful api
const router = new Router<any, Koa.Context>();
router.use('/api', api.routes());
app.use(router.routes());

app.listen(PORT, () => {
  console.log('Listening at port', PORT);
});

mongoose.connect(DB_CFG.url)
  .then(() => {
    console.log('connect the mongodb');
  })
  .catch(e => {
    errorLog(JSON.stringify(e));
  });
