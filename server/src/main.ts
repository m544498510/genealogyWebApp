import * as path from 'path';
import * as Koa from 'koa';

import * as Router from 'koa-router';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import * as staticTool from 'koa-static';

import * as mongoose from 'mongoose';

import {graphqlKoa, graphiqlKoa} from 'apollo-server-koa';

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

const router = new Router();
router.use('/api', api.routes());
router.get('/graphql', graphqlKoa({schema: schema}));
router.post('/graphql', graphqlKoa({schema: schema}));

if (process.env.NODE_ENV !== 'production') {
  router.get(
    '/graphiql',
    graphiqlKoa({
      endpointURL: '/graphql',
    }),
  );
  console.log('graphiql is open');
}

app.use(router.routes());

const server = app.listen(PORT, () => {
  console.log('Listening at port', server.address().port)
});

mongoose.connect(DB_CFG.url)
  .then(() => {
    console.log('connect the mongodb');
  })
  .catch(e => {
    errorLog(JSON.stringify(e));
  });

