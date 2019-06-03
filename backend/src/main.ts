import path from 'path';

import Koa from 'koa';
import Router from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import staticTool from 'koa-static';
import {ApolloServer} from 'apollo-server-koa';

import mongoose from 'mongoose';

import {addLogger, errorLog} from './utils/log';
import {DB_CFG, PORT} from './config';

import api from './routers';
import schema from './modules/schema';

const app = new Koa();

app.use(bodyParser());
app.use(json());

//add the static server
const publicPath = path.resolve(__dirname, '../public');
app.use(staticTool(publicPath));

//add the logger
addLogger(app);

const apolloServer = new ApolloServer({schema});
apolloServer.applyMiddleware({app});

const router = new Router();
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
