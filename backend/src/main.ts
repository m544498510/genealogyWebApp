import path from 'path';

import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import staticTool from 'koa-static';
import {ApolloServer} from 'apollo-server-koa';
import session from 'koa-session';
import mount from 'koa-mount';
import compress from 'koa-compress';

import mongoose from 'mongoose';

import {addLogger, errorLog} from './utils/log';
import {DB_CFG, PORT, apiPrefix, noAuthApiPrefixList} from './config';

import api from './modules/routers';
import schema from './modules/schema';
import {getUserInfo} from './utils/sessionUtils';
import pageRouter from './modules/page/router';

console.log("starting...");
const app = new Koa();
app.keys = ["cookie key"];

app.use(compress({
  threshold: 2048,
}));

//add the static server
const publicPath = path.resolve(__dirname, '../public');
app.use(mount('/public', staticTool(publicPath)));

//add the logger
addLogger(app);

app.use(bodyParser());
app.use(json());

//init session middleware
app.use(session({}, app));

// auth
app.use(async (ctx: Koa.Context, next: Function) => {
  //session filter
  const url = ctx.request.url;
  if (url.includes(apiPrefix.api) || url.includes(apiPrefix.graphql)) {
    if (noAuthApiPrefixList.some(noAuthPrefix => url.includes(noAuthPrefix)) || getUserInfo(ctx)) {
      await next();
    } else {
      ctx.response.status = 401;
    }
  } else {
    //pass the static request
    next();
  }
});

const apolloServer = new ApolloServer({
  schema,
  context: (req) => (req)
});
apolloServer.applyMiddleware({app, path: apiPrefix.graphql});

//restful api
app.use(api.routes());
//for single application
app.use(pageRouter.routes());

app.listen(PORT, () => {
  console.log('Listening at port', PORT);
});

mongoose.connect(DB_CFG.url, {useNewUrlParser: true})
  .then(() => {
    console.log('connected the mongodb');
  })
  .catch(e => {
    errorLog(JSON.stringify(e));
  });

console.log("main code complete");
