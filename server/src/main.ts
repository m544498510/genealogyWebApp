import * as path from 'path';
import * as Koa from 'koa';

import * as Router from 'koa-router';
import * as convert from 'koa-convert';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import * as staticTool from 'koa-static';

import {graphqlKoa, graphiqlKoa} from 'apollo-server-koa';

import {addLogger} from './utils/log';
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

if(process.env.NODE_ENV === 'development'){
  router.get(
    '/graphiql',
    graphiqlKoa({
      endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    }),
  );

}

app.use(router.routes());

app.listen(PORT);



