import * as path from 'path';
import * as Koa from 'koa';

import * as Router from 'koa-router';
import * as convert from 'koa-convert';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import * as staticTool from 'koa-static';

import * as mongoose from 'mongoose';

import {graphqlKoa, graphiqlKoa} from 'apollo-server-koa';

import {addLogger, errorLog} from './utils/log';
import {PORT} from './config';

import api from './routers';
import schema from './modules/schema';

const app = new Koa();

app.use(convert(bodyParser()));
app.use(convert(json()));

//add the static server
const publicPath = path.resolve(__dirname, '../public');
app.use(convert(staticTool(publicPath)));

//add the logger
addLogger(app);

const router = new Router();
router.use('/api', api.routes());
router.post('/graphql', graphqlKoa({schema: schema}));
router.get('/graphql', graphqlKoa({schema: schema}));

if (process.env.NODE_ENV === 'development') {
  router.get(
    '/graphiql',
    graphiqlKoa({
      endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    }),
  );

}

app.use(router.routes());

const server = app.listen(PORT, () => {
  console.log('Listening at port', server.address().port)
});

mongoose.connect('mongodb://localhost/genealogy')
  .then(() => {
    console.log('connect the mongodb');
  })
  .catch(e => {
    errorLog(JSON.stringify(e));
  });


import User from './modules/user/model';
const user = new User({
  name: 'test',
  password: 'pwd'
});
user.save()
  .then(result => {
    console.log(result);
  });

